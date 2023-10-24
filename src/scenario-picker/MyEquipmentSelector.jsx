import React from "react";
import {Modal, Button, Typography, List} from "antd";
import { PlusSquareOutlined, MinusSquareOutlined } from "@ant-design/icons";
import {alphabeticalSort} from "../util";
import Cookies from "js-cookie";
import ReactGA from 'react-ga4'

export default function MyEquipmentSelector({ data }) {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        if (open) {
            ReactGA.event('view_my_equipment');
        }
    }, [open]);

    const [myEquipment, setMyEquipment] = React.useState((Cookies.get('my-equipment') || '').split('|'));
    const [missingEquipment, setMissingEquipment] = React.useState((Cookies.get('missing-equipment') || '').split('|'));

    React.useEffect(() => void Cookies.set('my-equipment', myEquipment.join('|')), [myEquipment]);
    React.useEffect(() => void Cookies.set('missing-equipment', missingEquipment.join('|')), [missingEquipment]);

    const add = (value) => {
        ReactGA.event('add_equipment', { value });
        setMyEquipment(old => [...old, value]);
        setMissingEquipment(old => old.filter((a) => a !== value));
    };
    const remove = (value) => {
        ReactGA.event('remove_equipment', { value });
        setMyEquipment(old => old.filter((a) => a !== value));
        setMissingEquipment(old => [...old, value]);
    };

    const equipment = [...new Set(data.flatMap(scene => scene.requiredEquipment))]
        .sort(alphabeticalSort());

    const EquipmentItem = (value) => {
        const actions = [];
        if (!myEquipment.includes(value) || missingEquipment.includes(value)) {
            actions.push(
                <Button
                    icon={<PlusSquareOutlined />}
                    onClick={() => add(value)}
                >
                    I have
                </Button>
            );
        }
        if (myEquipment.includes(value) || !missingEquipment.includes(value)) {
            actions.push(
                <Button
                    icon={<MinusSquareOutlined />}
                    onClick={() => remove(value)}
                >
                    I don't have
                </Button>
            );
        }
        return (
            <List.Item actions={actions}>
                <Typography.Text>{value}</Typography.Text>
            </List.Item>
        );
    };

    return (
        <>
            <Button onClick={() => setOpen(true)}>
                My Equipment
            </Button>
            <Modal
                title='My Equipment'
                width='75%'
                open={open}
                style={{ height: 'calc(100vh - 150px)' }}
                bodyStyle={{ overflowY: 'scroll' }}
                footer={[
                    <Button key='done' onClick={() => setOpen(false)}>
                        Done
                    </Button>
                ]}
            >
                <Typography.Paragraph>
                    Let us know what equipment you have so we can tailor the scenarios to what you have.
                </Typography.Paragraph>
                <List
                    header='My Equipment'
                    dataSource={equipment.filter((value) => myEquipment.includes(value))}
                    bordered
                    renderItem={EquipmentItem}
                />
                <br />
                <List
                    header='Equipment Pool'
                    dataSource={equipment.filter((value) => !myEquipment.includes(value) && !missingEquipment.includes(value))}
                    bordered
                    renderItem={EquipmentItem}
                />
                <br />
                <List
                    header='Missing Equipment'
                    dataSource={equipment.filter((value) => missingEquipment.includes(value))}
                    bordered
                    renderItem={EquipmentItem}
                />
            </Modal>
        </>
    )
}