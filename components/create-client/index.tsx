"use client";

import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";
import { v4 as uuidv4 } from "uuid";
import { Select, SelectSection, SelectItem } from "@nextui-org/select";
import { networks } from "../data/chain"
import { useRouter } from 'next/navigation';
import { useSuiClientQuery } from '@mysten/dapp-kit';

export const CreateClient = () => {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [clientName, setClientName] = React.useState("");
    const [network, setNetwork] = React.useState("");
    
    const { push } = useRouter();
    const createClient = async () => {
        let userId = localStorage.getItem('userId');
        if (userId) {
            console.log('User ID:', userId);
            // Use the user ID as needed (e.g., for API requests, personalized content, etc.)
        } else {
            userId = uuidv4();
            localStorage.setItem('userId', userId as string);
        }
        const url = '/api/create-client';
        const id = uuidv4()
        const data = {
            name: clientName,
            userId: userId,
            network: network,
            id:id
        };
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };
        const response = await fetch(url, requestOptions);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        } else {
            push(`/client/${id}`);
            onClose()
        }
    }
    const handleSelectionChangeNetwork = (e:any) => {
        setNetwork(e.target.value);
      };
    return (
        <>
            <Button onPress={onOpen} color="primary">Create Client</Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Client</ModalHeader>
                            <ModalBody>
                                <Input
                                    autoFocus
                                    label="Client Name"
                                    placeholder="Enter Client Name"
                                    variant="bordered"
                                    value={clientName}
                                    onValueChange={setClientName}
                                />
                                <Select
                                    label="Select network"
                                    onChange={handleSelectionChangeNetwork}
                                    selectedKeys={[network]}
                                    defaultSelectedKeys='all'
                                >
                                    {networks.map((network) => (
                                        <SelectItem key={network.key}>
                                            {network.label}
                                        </SelectItem>
                                    ))}
                                </Select>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onPress={createClient}>
                                    Create
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};
