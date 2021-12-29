import React from "react";
import { Table } from 'antd';
import {Link} from "react-router-dom";
import TagsComponent from '../components/Tags';
import participantColourFunction from "./participantColourFunction";

const Tags = (values = []) => <TagsComponent values={values} colourFunction={participantColourFunction} />;

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

export default function ScenarioTable({ data }) {
    const dataSource = convert(data);

    return (
        <Table dataSource={dataSource} columns={columns} />
    );
}