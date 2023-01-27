from typing import Optional, List

from conventions.datetime_format import str_format
from conventions.file_system import Data, DataFile
from dataclasses import dataclass
from datetime import datetime
import re
from conventions.sql.tables import UsageAccounts, ProductCategories, SubCategories
from conventions.sql.connection import session


@dataclass
class SpendingAccount:
    @classmethod
    def from_csv_row(cls, row):
        row[0] = datetime.strptime(row[0], '%d-%m-%Y')
        row[2] = float(row[2].replace('.', '').replace(',', '.'))
        del row[3]
        return cls(*row)

    dt: datetime
    description: str
    change: float
    currency: str
    category: Optional[str] = None

    words_to_remove = {'nota', 'aftalenr', 'notanr', 'nr', 'visa', 'dankort', 'betalingsservice', 'køb', 'aps'}
    # by navne, lande navne, person navne
    to_replace = {'7-eleven': 'seven eleven', 'circle k': 'cirklek'}

    def parse_description(self):
        self.description = re.sub(' +', ' ', self.description)
        self.category = self.description.lower()
        for key, value in self.to_replace.items():
            if key in self.category:
                self.category = self.category.replace(key, value)
        self.category = re.sub(' +', ' ', re.sub('[^a-zA-ZæøåÆØÅ]+', ' ', self.category.strip()))
        self.category = ' '.join([word for word in self.category.split(' ')
                                  if len(word) > 1 and word not in self.words_to_remove])
        self.category = self.category.strip().capitalize()

    def add_to_sql_table(self, account):
        session.add(UsageAccounts(timestamp=self.dt.strftime(str_format),
                                  account=account,
                                  product_description=self.description,
                                  value=self.change))


def get_spending_account(data_file: DataFile) -> List[SpendingAccount]:
    result = []
    for row in data_file.gen_rows():
        sa = SpendingAccount.from_csv_row(row)
        sa.parse_description()
        result.append(sa)
    return result


def write_spending_accounts_to_sql(spending_accounts: List[SpendingAccount]):
    for sa in spending_accounts:
        sa.add_to_sql_table('Magnus lønkonto')
    session.commit()

def insert_example_categories():
    # session.add(ProductCategories(category='Indkøb'))
    session.add(SubCategories(category_id=2, sub_category='Rema 1000'))
    session.commit()


if __name__ == '__main__':
    insert_example_categories()
    # sas = get_spending_account(Data.mj_private)
    # write_spending_accounts_to_sql(sas)
    # for instance in session.query(UsageAccounts).filter(UsageAccounts.product_description.ilike('%Mobilepay%')):
    #     print(instance.frontend_row())
