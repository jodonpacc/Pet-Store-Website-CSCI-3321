How to get database working

1. pull main with database setup stuff
2. Make sure MySQL is installed
3. do npm install in the server directory to get dependencies
4. copy the .env file from the shared drive into the server directory
5. edit the password field in .env to be your MySQL password
6. import the petsmarter_database onto your computer using the petsmarter_database.sql file in the shared drive. More info here (https://www.thegeekstuff.com/2008/09/backup-and-restore-mysql-database-using-mysqldump/#more-184)
7. Uncomment the require(db_connection.js) line on app.js so that the database will connect

Each time
1. you have to make sure you start the MySQL server (on linux, the command is 'systemctl start mysqld', not sure on other OSes)
