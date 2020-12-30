import React, { useEffect, useState } from 'react';
import FormInformation from '../component/formInfomation'
import ViewTableData from '../component/table/tableInformation'

const PersonalInfomation = (props, state) => {
    const [dataToTable, setDataToTable] = useState([])
    useEffect(() => {
        localStorage.clear();
    },[])
    const handleDataResult = (data) => {
        setDataToTable(data)
    }
    return (
        <div>
            <FormInformation onDataResult={handleDataResult} />
            <ViewTableData dataToTable={dataToTable} />
        </div>
    )
}
export default PersonalInfomation