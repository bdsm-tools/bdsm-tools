import React from "react";
import {Checkbox, Table} from 'antd';
import {Link} from "react-router-dom";
import TagsComponent from '../components/Tags';
import participantColourFunction from "./participantColourFunction";
import MyEquipmentSelector from "./MyEquipmentSelector";
import equipmentFilterFunction from './filters/equipmentFilter';

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
    const applyEquipmentFilter = React.useCallback(equipmentFilterFunction(), [equipmentFilter]);

    const filteredDataSource = dataSource
        .filter(scene => equipmentFilter ? applyEquipmentFilter(scene) : true);
    return (
        <>
            <div className='flex' style={{ alignItems: 'center', margin: 10 }}>
                <MyEquipmentSelector data={data} />
                <Checkbox
                    checked={equipmentFilter}
                    onChange={({ target }) => setEquipmentFilter(target.checked)}
                    style={{ marginLeft: 20 }}
                >
                    Filter by equipment I have
                </Checkbox>
            </div>
            <Table dataSource={filteredDataSource} columns={columns}/>
        </>
    );
}