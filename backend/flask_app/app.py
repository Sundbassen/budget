from flask import Flask
from flask import request, jsonify
from flask_cors import CORS
from conventions.sql.connection import session
from conventions.sql.tables import UsageAccounts, ProductCategories, SubCategories, add_to_sql_table, CategoryGroups


class Configuration:
    version = "1.0"
    static = False
    jwt_secret = "SALMON"


def get_app():
    flask_instance = Flask(import_name=__name__)
    flask_instance.config.update(
        DEBUG=True)
    return flask_instance


app = get_app()
CORS(app=app)


@app.route("/", methods=["GET"])
def ping():
    return 'pong', 200


@app.route("/transactions", methods=["POST"])
def transactions():
    data = []
    for instance in session.query(UsageAccounts):
        data.append(instance.frontend_row())
    return jsonify(data), 200


@app.route("/categories", methods=["POST"])
def categories():
    data = [instance.frontend_row() for instance in session.query(ProductCategories)]
    return jsonify(data), 200


@app.route("/sub_categories", methods=["POST"])
def sub_categories():
    data = [sub_cat.frontend_row(cat.category) for cat, sub_cat in
            session.query(ProductCategories, SubCategories).filter(
                ProductCategories.id_ == SubCategories.category_id)]
    return jsonify(data), 200


@app.route("/add_sub_category", methods=["POST"])
def add_sub_category():
    sub_cat_string = request.get_json()['subCategory']
    sub_category = SubCategories.from_frontend(request.get_json())
    if sub_category is None:
        return f'{sub_cat_string} already exists', 422
    add_to_sql_table(sub_category)

    return f'{sub_category.sub_category} succesfully added to categories', 200


@app.route("/add_category", methods=["POST"])
def add_category():
    cat_string = request.get_json()['category']
    category = ProductCategories.from_frontend(cat_string)
    if category is None:
        return f'{cat_string} already exists', 422
    add_to_sql_table(category)

    return f'{category.category} succesfully added to categories', 200


@app.route("/add_group", methods=["POST"])
def add_category():
    group_string = request.get_json()['group']
    group = CategoryGroups.from_frontend(group_string)
    if group is None:
        return f'{group} already exists', 422
    add_to_sql_table(group)

    return f'{group.group} succesfully added to categories', 200


@app.route("/delete_category", methods=["POST"])
def delete_category():
    id_ = request.get_json()['id']
    session.query(ProductCategories).filter(ProductCategories.id_ == id_).delete()
    session.query(SubCategories).filter(SubCategories.category_id == id_).delete()
    session.query(CategoryGroups).filter(CategoryGroups.category_id == id_).delete()
    session.commit()
    return 'Success', 200


@app.route("/delete_category", methods=["POST"])
def delete_group():
    id_ = request.get_json()['id']
    session.query(CategoryGroups).filter(CategoryGroups.id_ == id_).delete()
    session.commit()
    return 'Success', 200


@app.route("/delete_sub_category", methods=["POST"])
def delete_sub_category():
    id_ = request.get_json()['id']
    session.query(SubCategories).filter(SubCategories.id_ == id_).delete()
    session.query(CategoryGroups).filter(CategoryGroups.sub_category_id == id_).delete()
    session.commit()
    return 'Success', 200


app.run(host='0.0.0.0', debug=False)
