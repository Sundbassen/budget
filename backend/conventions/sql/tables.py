from sqlalchemy import Table, Column, Integer, String, TIMESTAMP, Float

from conventions.datetime_format import str_format
from conventions.sql.connection import Base, session


def add_to_sql_table(table_row: Base):
    session.add(table_row)
    session.commit()


class UsageAccounts(Base):
    __tablename__ = "usage_accounts"
    id_ = Column(Integer, primary_key=True, autoincrement=True)
    timestamp = Column(TIMESTAMP)
    account = Column(String)
    category_id = Column(Integer)
    sub_category_id = Column(Integer)
    product_description = Column(String)
    value = Column(Float)

    def __repr__(self):
        return str(self.__dict__)

    def frontend_row(self):
        return {
            'id': self.id_,
            'date': self.timestamp.strftime(str_format),
            'account': self.account,
            'description': self.product_description,
            'category': None,
            'subCategory': None,
            'value': self.value
        }


class CategoryGroups(Base):
    __tablename__ = "category_groups"
    id_ = Column(Integer, primary_key=True, autoincrement=True)
    category_id = Column(Integer)
    sub_category_id = Column(Integer)
    group = Column(String)

    def frontend_row(self, category: str, sub_category: str):
        return {'category': category, 'categoryId': self.category_id,
                'id': self.id_, 'subCategory': sub_category, 'subCategoryId': self.sub_category_id}

    @classmethod
    def from_frontend(cls, request):
        exists = session.query(cls.group).filter_by(sub_category=request['group']).first() is not None
        if exists:
            return None
        return cls(category_id=request['categoryId'], sub_category=request['subCategoryId'], group=request['group'])


class SubCategories(Base):
    __tablename__ = "sub_categories"
    id_ = Column(Integer, primary_key=True, autoincrement=True)
    category_id = Column(Integer)
    sub_category = Column(String)

    def frontend_row(self, category: str):
        return {'category': category, 'categoryId': self.category_id,
                'id': self.id_, 'subCategory': self.sub_category}

    @classmethod
    def from_frontend(cls, request):
        exists = session.query(cls.sub_category).filter_by(sub_category=request['subCategory']).first() is not None
        if exists:
            return None
        return cls(category_id=request['categoryId'], sub_category=request['subCategory'])


class ProductCategories(Base):
    __tablename__ = "product_categories"
    id_ = Column(Integer, primary_key=True, autoincrement=True)
    category = Column(String)

    def frontend_row(self):
        return {'category': self.category, 'id': self.id_}

    @classmethod
    def from_frontend(cls, category):
        exists = session.query(cls.category).filter_by(category=category).first() is not None
        if exists:
            return None
        return cls(category=category)
