# Welcome to the backend
## Description
* We use Django + Python as our backend to communicate between the frontend (React) and our database (MongoDB)

## Setting up
### Prerequisites
* django
* pymongo
<pending>

### Working
* Our backend as a whole is a project, which will consists of multiple apps (components)
* Eg. A registration component, a login component, etc. etc.
* To make a new app, run the command  
  `python manage.py startapp <appname>`. 
  
  There should be a new directory called <appname> that would've been created
### Running 
1. Pull the git repo using the clone button on the top right of this page (either SSH or HTML would do)
2. `cd` into the repository
3. run `python3 manage.py runserver` and check to see if there is any output in the terminal
