#These packages should be installed before being able to test the Database commands

Packages = [pandas, cloud-sql-python-connector]

Commands = [
    pip install pandas
    pip install "cloud-sql-python-connector[pymysql]"
]