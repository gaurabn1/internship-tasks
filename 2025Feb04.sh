#!/bin/bash

# Shell script that demonstrates basic system administration tasks in Linux using shell commands

readonly DIR=~/project_files
readonly FILE=~/project_files/welcome.txt
readonly USER="intern_user"
readonly GROUP="developers"


# Directory Deletion
echo $(sudo rm -rf $DIR)
# Remove user 
echo $(sudo userdel $USER)
# Remove group
echo $(sudo groupdel $GROUP)

### Task 1: Directory Management
# - Create a new directory named "project_files" in the /home/{user} directory
# Create the directory "project_files"
echo "Creating Directory..."
echo $(mkdir $DIR)
if [ $? -eq 0 ]; then
  echo "Directory created: $DIR"
else
  echo "Error creating directory: $DIR"
  exit 1
fi

echo "--------------------------------------------------------------------"

### Task 2: User and Group Management
# Create a new group named "developers"
echo "Creating group..."
echo $(sudo groupadd $GROUP)
if [ $? -eq 0 ]; then
  echo "Group created: $GROUP"
else
  echo "Error creating group: $GROUP"
  exit 1
fi


echo "--------------------------------------------------------------------"

# Create a new user named "intern_user"
echo "Creating user..."
if ! getent passwd $USER > /dev/null; then
  echo $(sudo useradd $USER)
  if [ $? -eq 0 ]; then
    echo "User created: $USER"
  else
    echo "Error creating user: $USER"
    exit 1
  fi
else
  echo "User $USER already exists."
fi


echo "--------------------------------------------------------------------"

# Add "intern_user" to the "developers" group
echo "Adding user $USER to group $GROUP...."
echo $(sudo usermod -aG $GROUP $USER)
if [ $? -eq 0 ]; then
  echo "User $USER added to group: $GROUP"
else
  echo "Error adding user $USER to group: $GROUP"
  exit 1
fi


echo "--------------------------------------------------------------------"

# Set an appropriate password for the user
echo "Please set a password for the user $USER"
echo $(sudo passwd $USER)

echo "--------------------------------------------------------------------"

### Task 4: Additional Tasks
# - Create a welcome text file inside the "project_files" directory
# - The file should contain:
#   - Creation date and time
#   - Directory path
#   - Owner and group information
# Set appropriate permissions for this file

# Write content to the welcome file
echo "Writing information to $FILE"
echo $(touch $FILE)
echo "File created: $FILE"

# Writing the Date and Time infomation in the welcome.txt file
echo "Date and Time: $(stat -c %y $FILE)" >> $FILE

# Writing the Directory Path in the welcome.txt file
echo "Directory Path: $(realpath $DIR)" >> $FILE

# Writing the Owner and Group infomation in the welcome.txt file
echo "Owner information: $(stat -c %U $FILE) and group information: $(stat -c %G $FILE)" >> $FILE

echo "--------------------------------------------------------------------"

echo "Setting permissions for the File: $FILE"
echo $(sudo chmod 750 $FILE)
echo "Permissions set: $FILE"

echo "--------------------------------------------------------------------"

# Task 3: Permissions and Ownership

# Setting directory permissions:
# - The owner can read, write, and execute
# - The group can read and execute
# - Others should have no permissions
echo "Setting directory permissions..."
echo $(sudo chmod 750 $DIR)
echo "Permissions set: $DIR"

echo "--------------------------------------------------------------------"

# Add the current user user to the "developers" group
sudo usermod -aG $GROUP $(whoami)

# Change the ownership of the "project_files" directory to "intern_user" and group "developers"
echo "Changing directory ownership to $USER:$GROUP"
echo $(sudo chown -R $USER:$GROUP $DIR)
if [ $? -eq 0 ]; then
  echo "Ownership changed to $USER:$GROUP"
else
  echo "Error changing ownership: $DIR"
  exit 1
fi

echo "--------------------------------------------------------------------"

### Task 5: Verification
# - Add commands at the end of your script to verify:
#   - Directory creation and permissions
#   - User creation and group membership
#   - File creation and contents

echo "Verifying the tasks..."

# Check if the directory exists
if [ -d $DIR ]; then
  echo "Directory 'project_files' exists."
else
  echo "Directory 'project_files' doesn't exist."
fi

echo "--------------------------------------------------------------------"

# Check if user exists
if getent passwd $USER > /dev/null; then
  echo "${USER} exists."
else
  echo "${USER} does not exist."
fi

echo "--------------------------------------------------------------------"

# Check if groups exists
if [ $(getent group $GROUP) ]; then
  echo "${GROUP} exists."
else
  echo "${GROUP} does not exist."
fi

echo "--------------------------------------------------------------------"

# Check if file exists
if [ -f $FILE ]; then
  echo "${FILE} exists."
  head $FILE
else
  echo "${FILE} does not exist."
fi

echo "--------------------------------------------------------------------"
