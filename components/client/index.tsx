"use client";

import React, { useState, useEffect } from "react";
import { Input, Button, Textarea } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Checkbox, Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";
import { Select, SelectSection, SelectItem } from "@nextui-org/select";
import { useSuiClientQuery } from '@mysten/dapp-kit';

export const ClientPage = ({ params }: any) => {
    const [moduleName, setModuleName] = React.useState("");
    const [functionName, setFunctionName] = React.useState("");
    const [network, setNetwork] = React.useState("");
    const [packageId, setPackageId] = React.useState("");
    const [typeArgs, setTypeArgs] = React.useState("");
    const [actions, setActions] = React.useState([]);
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
    const getDataClient = async () => {
        const clientRes = await fetch(`/api/clients?id=${params.id}`)
        const clients = await clientRes.json();
        console.log("clients", clients.result[0])
    }
    const getActions = async () => {
        const actionRes = await fetch(`/api/actions?client=${params.id}`)
        const actions = await actionRes.json();
        console.log("actions", actions)
        setActions(actions.result)
    }
    const createActions = async () => {
        let userId = localStorage.getItem('userId');
        if (userId) {
            // Use the user ID as needed (e.g., for API requests, personalized content, etc.)
        } else {

            localStorage.setItem('userId', userId as string);
        }
        const url = '/api/create-action';

        const data = {
            moduleName: moduleName,
            functionName: functionName,
            packageId: packageId,
            typeArgs: typeArgs,
            client: params.id
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
            onClose()
        }
    }
    useEffect(() => {
        //get package id by params ID
        getDataClient()
        getActions();
        //get actions list
        // type agument is share object https://suiscan.xyz/devnet/account/0xddcb8e0201c60078757a39fbbd2d688c5ebce28fb3692e2a205f75880299e06e

    }, [])
    const handleSelectionChangeNetwork = (e: any) => {
        setNetwork(e.target.value);
    };
    return (
        <div className="my-14 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
            <div className="flex justify-between flex-wrap gap-4 items-center">
                <div className="flex items-center gap-3 flex-wrap md:flex-nowrap"></div>
                <div className="flex flex-row gap-3.5 flex-wrap">
                    <Button onPress={onOpen} color="primary">
                        Create Move Call
                    </Button>
                    <Button onPress={onOpen} color="primary">
                        Create Tranfer Object
                    </Button>
                    <Modal
                        isOpen={isOpen}
                        onOpenChange={onOpenChange}
                        placement="top-center"
                    >
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1">Create Move Call</ModalHeader>
                                    <ModalBody>
                                        <Input
                                            autoFocus
                                            label="Package"
                                            placeholder="Enter Package"
                                            variant="bordered"
                                            value={packageId}
                                            onValueChange={setPackageId}
                                        />
                                        <Input
                                            autoFocus
                                            label="Module"
                                            placeholder="Enter Module Name"
                                            variant="bordered"
                                            value={moduleName}
                                            onValueChange={setModuleName}
                                        />
                                        <Input
                                            autoFocus
                                            label="Function Name"
                                            placeholder="Enter Function Name"
                                            variant="bordered"
                                            value={functionName}
                                            onValueChange={setFunctionName}
                                        />
                                        <Input
                                            autoFocus
                                            label="Type Args"
                                            placeholder="Enter Type Args"
                                            variant="bordered"
                                            value={typeArgs}
                                            onValueChange={setTypeArgs}
                                        />
                                        {/* <Select
                                            label="Select network"
                                            onChange={handleSelectionChangeNetwork}
                                            selectedKeys={[network]}
                                            default={0}
                                        >
                                            {networks.map((network) => (
                                                <SelectItem key={network.key}>
                                                    {network.label}
                                                </SelectItem>
                                            ))}
                                        </Select> */}
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="primary" onPress={createActions}>
                                            Create
                                        </Button>
                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </div>
                <div className="max-w-[95rem] mx-auto w-full">
                    {actions && actions.map((action: any) => (
                        <Card className="max-w-[400px] mt-3">
                            <CardHeader className="flex gap-3">
                                <Image
                                    alt="nextui logo"
                                    height={40}
                                    radius="sm"
                                    src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                                    width={40}
                                />
                                <div className="flex flex-col">
                                    <p className="text-md">{action.packageId}::{action.moduleName}::{action.functionName}{action.typeArgs && `<${action.typeArgs}>`}</p>
                                    <p className="text-small text-default-500">nextui.org</p>
                                </div>
                            </CardHeader>
                            <Divider />
                            <CardBody>
                                <p>Make beautiful websites regardless of your design experience.</p>
                            </CardBody>
                            <Divider />
                            <CardFooter>
                                <Link
                                    isExternal
                                    showAnchorIcon
                                    href="https://github.com/nextui-org/nextui"
                                >
                                    Visit source code on GitHub.
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}

                </div>
            </div>

        </div>
    )
};