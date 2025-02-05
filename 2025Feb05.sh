# Hey team! I've got a quick learning task for our interns to get familiar with Linux system monitoring and cron jobs.
# 📋 Task Overview
#
# You'll create a simple monitoring script that:
# Lists top 5 resource-heavy processes
# Runs automatically every 5 minutes using cron
# Saves results to a log file
readonly FILE=~/Internship/Tasks/cron-output.log

echo "Date: "$(date) >> $FILE
$(ps -eo pid,ppid,%cpu,%mem --sort=-%cpu | head -n 6 >> $FILE)
echo >> $FILE


# 💡 Great for learning:
# Basic shell scripting
# Cron job automation
# System monitoring commands
# Log file management
#
# 🛠️ Helpful commands to get started:
# Process listing: ps -eo pid,ppid,%cpu,%mem --sort=-%cpu | head -n 6
# Cron job setup: crontab -e
# ❓ Feel free to ask questions in this thread! This is a learning exercise, so don't hesitate to reach out if you need help.


