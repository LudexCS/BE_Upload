import * as grpc from '@grpc/grpc-js';
import { IdRequest } from '../generated/management_pb';
import { ValidationServiceClient } from '../generated/management_grpc_pb';

const VALIDATION_SERVICE_NAME = process.env.MANAGEMENT_INNER as string || "default";

const validationServiceClient = new ValidationServiceClient(
    VALIDATION_SERVICE_NAME,
    grpc.credentials.createInsecure()
);

export const isValidGameId = (id: number): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        const request = new IdRequest();
        request.setId(id);

        validationServiceClient.isValidGameId(request, (err, res) => {
            if (err) {
                console.error('gRPC Error (isValidGameId):', err);
                return reject(err);
            }
            resolve(res.getIsvalid());
        });
    });
};

export const isValidResourceId = (id: number): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        const request = new IdRequest();
        request.setId(id);

        validationServiceClient.isValidResourceId(request, (err, res) => {
            if (err) {
                console.error('gRPC Error (isValidResourceId):', err);
                return reject(err);
            }
            resolve(res.getIsvalid());
        });
    });
};
