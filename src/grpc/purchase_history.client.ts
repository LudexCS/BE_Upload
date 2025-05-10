import * as grpc from "@grpc/grpc-js";
import {PurchaseHistoryServiceClient} from "../generated/purchase_history_grpc_pb";
import {CheckPurchaseRequest, CheckTransactionRequest} from "../generated/purchase_history_pb";

const SERVICE_NAME = process.env.Purchase_INNER as string || "default";

const client = new PurchaseHistoryServiceClient(
    SERVICE_NAME,
    grpc.credentials.createInsecure()
);

export async function checkIfPurchased(userId: number, gameId: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
        const request = new CheckPurchaseRequest();
        request.setUserid(userId);
        request.setGameid(gameId);

        client.checkPurchase(request, (err, response) => {
            if (err) {
                return reject(err);
            }
            resolve(response.getIstransacted());
        });
    });
}

export async function checkIfTransacted(userId: number, resourceId: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
        const request = new CheckTransactionRequest();
        request.setUserid(userId);
        request.setResourceid(resourceId);

        client.checkTransaction(request, (err, response) => {
            if (err) {
                return reject(err);
            }
            resolve(response.getIstransacted());
        });
    })
}