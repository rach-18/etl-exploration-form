import axios from "axios";
import { useEffect, useState } from "react";

function Form() {
    const [unit, setUnit] = useState('');
  const [mine, setMine] = useState('');
  const [projectName, setProjectName] = useState('');
  const [workAwardedTo, setWorkAwardedTo] = useState('');
  const [loiDate, setLoiDate] = useState('');
  const [workCommencementDate, setWorkCommencementDate] = useState('');
  const [presentStatus, setPresentStatus] = useState('');
  const [records, setRecords] = useState([]);

  // useEffect(() => {
  //   const fetchRecords = async () => {
  //     try {
  //       const response = await fetch('http://192.168.90.87:7000/fetch-records');
  //       // const data = await response.json();
  //       console.log("Fetched Data:", response); // Debugging: Check the API response
  //       // console.log("Token:", data.data.token)
  //       if (Array.isArray(data)) {
  //         setRecords(data);
  //       } else {
  //         setRecords([]); // Ensure it's an array to prevent .map() errors
  //       }
  //     } catch (error) {
  //       console.error("Error fetching records:", error);
  //       setRecords([]); // Prevent crashes
  //     }
  //   };
  
  //   fetchRecords();
  // }, []);

  useEffect(() => {
    const fetchRecords = async() => {
      try {
        const response = await axios.get('http://192.168.90.87:7000/fetch-records', {withCredentials: true});
        console.log(response)
      }
      catch(err) {
        console.log(err);
      }
    }

    fetchRecords()
  }, [])
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic (e.g., make an API call)
    const formData = {
      unit,
      mine,
      projectName,
      workAwardedTo,
      loiDate,
      workCommencementDate,
      presentStatus,
    };
    // Perform POST request to submit form data
    try {
        const response = await axios.post('http://192.168.90.87:7000', formData)
        console.log(response.data)
    }
    catch(err) {
        console.log('Failed to add data', err);
    }
  };

  return (
    <div className="w-[60%] mx-auto mt-6">
      {/* Logout Button */}
      <div className="flex justify-end">
        <a href="/logout" className="bg-[#6c757d] text-white px-5 py-2 rounded-md hover:bg-[#5A6268] transition-all mb-3">Logout</a>
      </div>

      <h2 className="mb-6 text-4xl font-semibold">Add New Record</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Unit Dropdown with Unit Codes */}
        <div className="flex flex-col">
          <label htmlFor="unit" className="text-lg">Select Unit:</label>
          <select
            id="unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="w-full border-[0.1rem] border-gray-300 px-3 py-2 rounded-md mt-2"
          >
            <option value="ICC">ICC</option>
            <option value="KCC">KCC</option>
            <option value="MCP">MCP</option>
          </select>
        </div>

        {/* Branch Dropdown (Mine) */}
        <div className="flex flex-col">
          <label htmlFor="mine" className="text-lg">Select Mines:</label>
          <select
            id="mine"
            value={mine}
            onChange={(e) => setMine(e.target.value)}
            className="w-full border-[0.1rem] border-gray-300 px-3 py-2 rounded-md mt-2"
          >
            <optgroup label="ICC">
              <option value="Surda">Surda</option>
              <option value="Kendadih">Kendadih</option>
              <option value="Rakha">Rakha</option>
            </optgroup>
            <optgroup label="KCC">
              <option value="Khetri">Khetri</option>
              <option value="Kolihan">Kolihan</option>
              <option value="Banwas">Banwas</option>
            </optgroup>
            <optgroup label="MCP">
              <option value="Malanjkhand">Malanjkhand</option>
            </optgroup>
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="project_name" className="text-lg">Project Name</label>
          <input
            type="text"
            id="project_name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full border-[0.1rem] border-gray-300 px-3 py-2 rounded-md mt-2"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="work_awarded_to" className="text-lg">Contractor</label>
          <input
            type="text"
            id="work_awarded_to"
            value={workAwardedTo}
            onChange={(e) => setWorkAwardedTo(e.target.value)}
            className="w-full border-[0.1rem] border-gray-300 px-3 py-2 rounded-md mt-2"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="loi_date" className="text-lg">LoI/Work Awarded Date</label>
          <input
            type="date"
            id="loi_date"
            value={loiDate}
            onChange={(e) => setLoiDate(e.target.value)}
            className="w-full border-[0.1rem] border-gray-300 px-3 py-2 rounded-md mt-2"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="work_commencement_date" className="text-lg">Work Commencement Date</label>
          <input
            type="date"
            id="work_commencement_date"
            value={workCommencementDate}
            onChange={(e) => setWorkCommencementDate(e.target.value)}
            className="w-full border-[0.1rem] border-gray-300 px-3 py-2 rounded-md mt-2"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="present_status" className="text-lg">Present Status</label>
          <input
            type="text"
            id="present_status"
            value={presentStatus}
            onChange={(e) => setPresentStatus(e.target.value)}
            className="w-full border-[0.1rem] border-gray-300 px-3 py-2 rounded-md mt-2"
            required
          />
        </div>

        <button type="submit" className="bg-[#007bff] text-white px-5 py-2 rounded-md hover:bg-[#0069D9] hover:cursor-pointer transition-all my-5">Add Record</button>
      </form>

      <hr className="border-[0.1rem] border-gray-300 my-2" />
      <h2 className="mb-4 text-4xl font-semibold">Existing Records</h2>
      <table className="min-w-full table-auto border-collapse border border-gray-300 mb-5">
        <thead className="bg-gray-100">
            <tr>
                <th className="py-2 px-4 border-b text-left font-semibold font-medium text-gray-700">Unit</th>
                <th className="py-2 px-4 border-b text-left font-semibold font-medium text-gray-700">Mine</th>
                <th className="py-2 px-4 border-b text-left font-semibold font-medium text-gray-700">Project Name</th>
                <th className="py-2 px-4 border-b text-left font-semibold font-medium text-gray-700">Actions</th>
            </tr>
        </thead>
        <tbody>
            {/* Loop through the records */}
            {records.map((record, index) => (
            <tr key={index} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b text-sm">{record.Unit}</td>
                <td className="py-2 px-4 border-b text-sm">{record.Mine}</td>
                <td className="py-2 px-4 border-b text-sm">{record['Project Name']}</td>
                <td className="py-2 px-4 border-b text-sm">
                <a
                    href={`/update/${record['Project Name']}`}
                    className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600 mr-2"
                >
                    Edit
                </a>
                <form
                    action={`/delete/${record['Project Name']}`}
                    method="post"
                    style={{ display: 'inline-block' }}
                >
                    <button
                    type="submit"
                    className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
                    >
                    Delete
                    </button>
                </form>
                </td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>
  );
}

export default Form;
