import { Publisher } from "@prisma/client";
import { prisma } from "../../config/db";
import moment from "moment";

export const selectPublisher = async () => {
    return await prisma.publisher.findMany();
};

export const insertPublisher = async (newPublisherData: Publisher) => {
    return await prisma.publisher.create({
        data: {
            name: newPublisherData.name,
            address: newPublisherData.address,
        },
    });
};

export const updatePublisher = async (
    newPublisherData: Publisher,
    publisherId: number
) => {
    return await prisma.publisher.update({
        where: {
            id: publisherId,
        },
        data: {
            name: newPublisherData.name,
            address: newPublisherData.address,
            updateAt: moment().toISOString(),
        },
    });
};

export const deletePublisher = async (publisherId: number) => {
    return await prisma.publisher.delete({
        where: {
            id: publisherId,
        },
    });
};
