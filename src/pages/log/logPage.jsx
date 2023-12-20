import React, { useContext, useEffect, useState } from 'react';
import { RecordContext } from '../../contexts/recordlogContext';
import { Spin, Timeline, Radio, DatePicker } from 'antd';
import { format } from 'date-fns';
import moment from 'moment';

const LogPage = () => {
    const {
        recordState: { records, isLoading },
        getRecords,
    } = useContext(RecordContext);

    const [value, setValue] = useState('');
    const [date, setDate] = useState(null);
    const [filteredRecords, setFilteredRecords] = useState([]);
    const [loading, setLoading] = useState(false);

    const onChange = (e) => {
        setValue(e.target.value);
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };

    const onDateChange = (date, dateString) => {
        const formattedDates = moment(dateString, 'YYYY-MM-DDTHH:mm:ss.SSSZ').toISOString();
        setDate(formattedDates);
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };

    useEffect(() => {
        const filterRecords = async () => {
            await getRecords();

            let filtered = records;

            if (value) {
                filtered = filtered.filter((red) =>
                    red.object.toLowerCase().includes(value.toLowerCase())
                );
            }

            if (date) {
                filtered = filtered.filter((red) => {
                    return format(new Date(red.createAt), 'yyyy-MM-dd') === format(new Date(date), 'yyyy-MM-dd')
                });
            }

            setFilteredRecords(filtered);
        };

        filterRecords();
    }, [value, date, getRecords, records]);

    const recordTimelines = filteredRecords.map((red) => ({
        label: format(new Date(red.createAt), 'yyyy-MM-dd HH:mm:ss'),
        children: red.record,
        color: {
            create: 'green',
            update: 'blue',
            delete: 'red',
            auth: 'orange',
        }[red.type] || 'gray',
    }));

    let body = null;

    if (isLoading || loading) {
        body = (
            <div style={{  }}>
                <Spin size="large" />
            </div>
        );
    } else {
        body = (
            <>
                <Timeline reverse={true} mode={'left'} items={recordTimelines} />
            </>
        );
    }

    const filterObject = (
        <>
            <Radio.Group onChange={onChange} value={value}>
                <Radio value={''}>All</Radio>
                <Radio value={'Employee'}>Employee</Radio>
                <Radio value={'Project'}>Project</Radio>
                <Radio value={'User'}>User</Radio>
            </Radio.Group>
        </>
    );

    const filterDate = (
        <>
            <DatePicker onChange={onDateChange} />
        </>
    );

    return (
        <>
            <h1>Records</h1>
            <div style={{ display: 'flex' }}>
                <div style={{ display: 'block' }}>
                {filterObject}
                {filterDate}
                </div>
                {body}
            </div>
        </>
    );
};

export default LogPage;