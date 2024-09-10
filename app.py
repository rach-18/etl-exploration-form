from flask import Flask, render_template, request, redirect, url_for, flash, session
import pandas as pd
from datetime import datetime
import os

app = Flask(__name__)
app.secret_key = "supersecretkey"

# File path for the Excel file
file_path = 'records.xlsx'

USERNAME = "user1"
PASSWORD = "password"


# Load the Excel file or create a new one if it doesn't exist
def load_data():
    if os.path.exists(file_path):
        df = pd.read_excel(file_path)
    else:
        # Create a new DataFrame with the specified columns
        columns = [
            'Unit', 'Mine', 'Project Name', 'Contractor', 'LoI/Work awarded Date',
            'Work Commencement Date',
            'Mobilisation Period', 'Target Completion date',
            'Total Drilling Quantity  (in m)', 'Total CAPEX Amount  as per tender (Rs in Lakh)',
            'Physical Work Target in the month',
            'Physical Work Done in the month',
            'Physical Work Target upto the month for FY',
            'Physical Work Done upto the month for FY',
            'Physical Work Target upto the month from inception',
            'Physical Work Done up to the month from inception',
            'Drilling Target for the month',
            'Achieved Drilling Meterage in the month',

            'Drilling Target upto the month for FY',
            'Achieved Drilling Meterage up to the month for FY',

            
            'Drilling Target upto the month from inception',
            'Achieved Drilling Meterage up to the month from inception',
            'Bills raised by Contractor in the month',
            'Bills raised by Contractor up to the month in FY',
            'Bills rised by Contractor upto the month from inception',
            'Payments made to Contractor in the month',
            'Payments made to Contractor up to the month in FY',
            'Payments made to Contractor upto the month from inception',
            'Target CAPEX Amount for FY',
            'Achieved CAPEX Amount for FY',
            'Target CAPEX Amount for FY and so on',
            'Achieved CAPEX Amount for FY and so on',
            'Present Status',
            'Drilling Type',
            'Total Drilling Quantity  (in m)Target',
            'Username',
            'Date'
        ]
        df = pd.DataFrame(columns=columns)
        df.to_excel(file_path, index=False)
    return df


# Save the updated DataFrame back to the Excel file
def save_data(df):
    try:
        df.to_excel(file_path, index=False)
        print(f"Data saved successfully to {file_path}")
    except Exception as e:
        print(f"Error saving data: {e}")


# Route for the login page
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        if username == USERNAME and password == PASSWORD:
            session['logged_in'] = True
            return redirect(url_for('index'))
        else:
            flash('Invalid credentials, please try again.', 'danger')
    return render_template('login.html')


# Route for displaying the form and list of records
@app.route('/', methods=['GET', 'POST'])
def index():
    if not session.get('logged_in'):
        return redirect(url_for('login'))

    df = load_data()
    if request.method == 'POST':
        try:
            new_record = {
                'Unit': request.form['unit'],
                'Mine': request.form['mine'],
                'Project Name': request.form['project_name'],
                'Contractor': request.form['work_awarded_to'],
                'LoI/Work awarded Date': request.form['loi_date'],
                'Work Commencement Date': request.form['work_commencement_date'],
                'Present Status': request.form['present_status'],
                'Username': USERNAME,  # Capturing the username from session
                'Date': datetime.now().strftime("%Y-%m-%d")  # Capturing the current date
            }
            df = pd.concat([df, pd.DataFrame([new_record])])
            print(df)
            save_data(df)
            flash('Record added successfully!', 'success')
        except KeyError as e:
            flash(f"Error in form submission: {str(e)}", 'danger')
            print('error in submission')
        return redirect(url_for('index'))

    records = df.to_dict(orient='records')

    return render_template('form.html', records=records)


# Route for updating a record
@app.route('/update/<string:project_name>', methods=['GET', 'POST'])
def update(project_name):
    if not session.get('logged_in'):
        return redirect(url_for('login'))

    df = load_data()
    print(df)
    record = df[df['Project Name'] == project_name].iloc[0]

    if request.method == 'POST':
        try:
            df.loc[df['Project Name'] == project_name, 'Unit'] = request.form['unit']
            df.loc[df['Project Name'] == project_name, 'Mine'] = request.form['mine']
            df.loc[df['Project Name'] == project_name, 'Contractor'] = request.form['work_awarded_to']
            df.loc[df['Project Name'] == project_name, 'LoI/Work awarded Date'] = request.form['loi_date']
            df.loc[df['Project Name'] == project_name, 'Work Commencement Date'] = request.form[
                'work_commencement_date']
            df.loc[df['Project Name'] == project_name, 'Mobilisation Period'] = request.form[
                'mob_period']
            df.loc[df['Project Name'] == project_name, 'Target Completion date'] = request.form[
                'tar_completion']
            df.loc[df['Project Name'] == project_name,
            'Total Drilling Quantity  (in m)'] = request.form['tot_drilling']
            df.loc[df['Project Name'] == project_name,
            'Total CAPEX Amount  as per tender (Rs in Lakh)'] = request.form['tot_capex_amt']
            df.loc[df['Project Name'] == project_name,
            'Physical Work Target in the month'] = request.form['phy_work_done']
            df.loc[df['Project Name'] == project_name,
            'Physical Work Done in the month'] = request.form['phy_work_upto_done']
            df.loc[df['Project Name'] == project_name,
            'Physical Work Target upto the month for FY'] = request.form['phy_work_inc_done']
            df.loc[df['Project Name'] == project_name,
            'Physical Work Done upto the month for FY'] = request.form['phy_work_done_fy']
            df.loc[df['Project Name'] == project_name,
            'Physical Work Target upto the month from inception'] = request.form['phy_work_from_inc']


            df.loc[df['Project Name'] == project_name,
            'Physical Work Done up to the month from inception'] = request.form['phy_work_done_inc']
            df.loc[df['Project Name'] == project_name,'Drilling Target for the month'] = request.form[
            'drill_tar']
            df.loc[df['Project Name'] == project_name,
            'Achieved Drilling Meterage in the month'] = request.form['ac_drill_tar']

            df.loc[df['Project Name'] == project_name,
            'Drilling Target upto the month for FY'] = request.form['dril_tar_mon']
            df.loc[df['Project Name'] == project_name,
            'Achieved Drilling Meterage up to the month for FY'] = request.form['ac_drill_met']


            df.loc[df['Project Name'] == project_name,
            'Drilling Target upto the month from inception'] = request.form['ac_drill_tar_inc']
            df.loc[df['Project Name'] == project_name,
            'Achieved Drilling Meterage up to the month from inception'] = request.form['ac_drill_tar_mon']

            df.loc[df['Project Name'] == project_name,
            'Bills raised by Contractor in the month'] = request.form['bill_raised_contract']

            df.loc[df['Project Name'] == project_name,
            'Bills raised by Contractor up to the month in FY'] = request.form['bill_raised_contract_FY']

            df.loc[df['Project Name'] == project_name,
            'Bills rised by Contractor upto the month from inception'] = request.form['bill_raised_contract_inc']

            df.loc[df['Project Name'] == project_name,
            'Payments made to Contractor in the month'] = request.form['pay_made']

            df.loc[df['Project Name'] == project_name,
            'Payments made to Contractor up to the month in FY'] = request.form['pay_made_FY']

            df.loc[df['Project Name'] == project_name,
            'Payments made to Contractor upto the month from inception'] = request.form['pay_made_INC']

            df.loc[df['Project Name'] == project_name,
            'Target CAPEX Amount for FY'] = request.form['Tar_CAPEX']

            df.loc[df['Project Name'] == project_name,
            'Achieved CAPEX Amount for FY'] = request.form['achiev_CAPEX']

            df.loc[df['Project Name'] == project_name,
            'Target CAPEX Amount for FY and so on'] = request.form['target_CAPEX_FY']
            df.loc[df['Project Name'] == project_name,
            'Achieved CAPEX Amount for FY and so on'] = request.form['achieve_CAPEX_FY']
            df.loc[df['Project Name'] == project_name, 'Present Status'] = request.form['present_status']
            df.loc[df['Project Name'] == project_name, 'Drilling Type'] = request.form['dril_type']
            df.loc[df['Project Name'] == project_name, 'Total Drilling Quantity  (in m)Target'] = request.form['Total_dril']

            save_data(df)
            flash('Record updated successfully!', 'success')
        except KeyError as e:
            flash(f"Error in form submission: {str(e)}", 'danger')
        return redirect(url_for('index'))

    return render_template('update_form.html', record=record)


# Route for deleting a record
@app.route('/delete/<string:project_name>', methods=['POST'])
def delete(project_name):
    if not session.get('logged_in'):
        return redirect(url_for('login'))

    df = load_data()
    df = df[df['Project Name'] != project_name]
    save_data(df)
    flash('Record deleted successfully!', 'success')
    return redirect(url_for('index'))


# Route for logging out
@app.route('/logout')
def logout():
    session.pop('logged_in', None)
    flash('You have been logged out.', 'success')
    return redirect(url_for('login'))


if __name__ == '__main__':
    app.run(debug=True)