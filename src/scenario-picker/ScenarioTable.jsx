import React from "react";
import {Checkbox, Table, Select, Typography} from 'antd';
import {Link} from "react-router-dom";
import TagsComponent from '../components/Tags';
import participantColourFunction from "./participantColourFunction";
import MyEquipmentSelector from "./MyEquipmentSelector";
import equipmentFilterFunction from './filters/equipmentFilter';
import participantFilterFunction from './filters/participantFilter';
import compatibilityFilterFunction from './filters/compatibilityFilter';

const Tags = (values = []) => <TagsComponent values={values} colourFunction={participantColourFunction}/>;

const columns = [
    {
        title: 'Scenario Name',
        key: 'name',
        render: scene => (<Link to={`/tools/bdsm-scenarios/${scene.path}`}>{scene.name}</Link>),
    }, {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
    }, {
        title: 'Location',
        dataIndex: 'location',
        key: 'location',
    }, {
        title: 'Required Equipment',
        key: 'requiredEquipment',
        dataIndex: 'requiredEquipment',
        render: Tags,
    }, {
        title: 'Compatible Participants',
        key: 'participants',
        dataIndex: 'participants',
        render: Tags,
    }
];

const convert = (data = []) => data.map((scene) => ({
    ...scene,
}));

export default function ScenarioTable({data}) {
    const dataSource = convert(data);

    const [equipmentFilter, setEquipmentFilter] = React.useState(false);
    const applyEquipmentFilter = equipmentFilterFunction();

    const [participantFilter, setParticipantFilter] = React.useState(0);
    const applyParticipantFilter = participantFilterFunction(participantFilter);

    const [compatibilityFilter, setCompatibilityFilter] = React.useState([]);
    const applyCompatibilityFilter = compatibilityFilterFunction(compatibilityFilter);

    const filteredDataSource = dataSource
        .filter(scene => equipmentFilter ? applyEquipmentFilter(scene) : true)
        .filter(scene => participantFilter ? applyParticipantFilter(scene) : true)
        .filter(scene => compatibilityFilter ? applyCompatibilityFilter(scene) : true);
    return (
        <>
            <div style={{marginBottom: 20}}>
                <div className='flex' style={{alignItems: 'center'}}>
                    <MyEquipmentSelector data={data}/>
                    <Checkbox
                        checked={equipmentFilter}
                        onChange={({target}) => setEquipmentFilter(target.checked)}
                        style={{marginLeft: 20}}
                    >
                        Filter by equipment I have
                    </Checkbox>
                </div>
                <div className='flex' style={{alignItems: 'center', marginTop: 10}}>
                    <Typography.Text style={{width: 120}}>
                        Compatible with:
                    </Typography.Text>
                    <Select
                        mode='multiple'
                        allowClear
                        placeholder='Any Participants'
                        value={compatibilityFilter}
                        onChange={(value) => setCompatibilityFilter(value)}
                        style={{marginLeft: 10, width: 450}}
                    >
                        {[...new Set(data.flatMap(scene => scene.participants))].map(participant => (
                            <Select.Option key={participant} value={participant}>
                                {participant}
                            </Select.Option>
                        ))}
                    </Select>
                    <Typography.Text style={{width: 50, textAlign: 'center'}}>for</Typography.Text>
                    <Select
                        value={participantFilter}
                        onChange={(value) => setParticipantFilter(value)}
                    >
                        <Select.Option value={0}>Any Number of Participants</Select.Option>
                        <Select.Option value={1}>1 Participant</Select.Option>
                        <Select.Option value={2}>2 Participants</Select.Option>
                        <Select.Option value={3}>3 Participants</Select.Option>
                    </Select>
                </div>
            </div>
            <Table dataSource={filteredDataSource} columns={columns}/>
        </>
    );
}