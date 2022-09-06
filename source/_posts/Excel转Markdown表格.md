---
title: 【工具】Excel转Markdown表格
abbrlink: 29932
---
``` python
import pandas as pd

def excelToMd(path, sheetName="Sheet1"):
    df = pd.read_excel(path, sheetName)
    title = "|"
    splitLine = "|"
    for i in df.columns.values:
        title = title + i + "|"
        splitLine = splitLine + "--" + "|"
    print(title.replace("nan", "      ").replace("Unnamed: 0", "      ").replace("\n","<br>"))
    print(splitLine)
    for i in df.iterrows():
        row = "|"
        for j in df.columns.values:
            row = row + str(i[1][j]) + "|"
        print(row.replace("nan", "      ").replace("\n","<br>"))

```