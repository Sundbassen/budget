from conventions.sql.connection import engine, Base
import conventions.sql.tables # lol ... registers the tables to meta
Base.metadata.create_all(engine)