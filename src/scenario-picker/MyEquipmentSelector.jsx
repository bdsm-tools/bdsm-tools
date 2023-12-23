import React from "react";
import {Modal, Button, Typography, List} from "antd";
import { PlusSquareOutlined, MinusSquareOutlined } from "@ant-design/icons";
import ReactGA from 'react-ga4'
import { useDebounceFn, useLocalStorageState } from 'ahooks'
import {alphabeticalSort} from "../util";

export default function MyEquipmentSelector({ data }) {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        if (open) {
            ReactGA.event('view_my_equipment');
        }
    }, [open]);

    const [myEquipment, setMyEquipmentRaw] = useLocalStorageState('my-equipment', {
        defaultValue: [],
    });
    const [missingEquipment, setMissingEquipmentRaw] = useLocalStorageState('missing-equipment', {
        defaultValue: [],
    });

    const { run: setMyEquipment } = useDebounceFn(setMyEquipmentRaw, { wait: 250 });
    const { run: setMissingEquipment } = useDebounceFn(setMissingEquipmentRaw, { wait: 250 });

    const add = (value) => {
        ReactGA.event('add_equipment', { value });
        setMyEquipment(old => [...old, value].filter(o => !!o));
        setMissingEquipment(old => old.filter((a) => a !== value).filter(o => !!o));
    };
    const remove = (value) => {
        ReactGA.event('remove_equipment', { value });
        setMyEquipment(old => old.filter((a) => a !== value).filter(o => !!o));
        setMissingEquipment(old => [...old, value].filter(o => !!o));
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
                okText='Done'
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                cancelButtonProps={{ style: { display: 'none' } }}
                style={{ height: 'calc(100vh - 150px)' }}
                bodyStyle={{ overflowY: 'scroll' }}
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