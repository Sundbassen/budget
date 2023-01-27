from pathlib import Path
import os
from dataclasses import dataclass
import csv

@dataclass
class DataFile:
    path: Path

    @property
    def name(self):
        return self.path.stem.replace('_', ' ').capitalize()

    def gen_rows(self):
        with self.path.open('r', encoding='utf-8-sig', newline='') as f:
            reader = csv.reader(f, delimiter=';')
            for row in reader:
                yield row
class Data:
    dir = Path(os.path.abspath(os.path.curdir)) / '..' / 'data'
    mj_private = DataFile(dir / 'mj_private.csv')
    fa_private = DataFile(dir / 'fa_private.csv')
    shared = DataFile(dir / 'shared.csv')
    fa_nordnet = DataFile(dir / 'fa_nordnet.csv')
    mj_nordnet = DataFile(dir / 'mj_nordnet.csv')
    fa_crypto = DataFile(dir / 'fa_crypto.csv')
    mj_crypto = DataFile(dir / 'mj_crypto.csv')
