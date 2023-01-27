from sqlalchemy import  create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

import psycopg2
def connect():
   conn_string = "host='localhost' dbname='spending' user='magnus' password='Buster08'"
   return psycopg2.connect(conn_string)
engine = create_engine('postgresql+psycopg2://', creator=connect)
Base = declarative_base()

Session = sessionmaker(bind=engine)
session = Session()

