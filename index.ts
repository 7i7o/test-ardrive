import {
  arDriveFactory,
  wrapFileOrFolder,
  EID,
  ArDrive,
  FolderID,
  JWKWallet,
} from "ardrive-core-js";
import { config } from "dotenv";
config();

// get wallet from env variable
const jwk = JSON.parse(process.env.JWK as string);

const getArDriveFactory = (jwk: any) => {
  if (!jwk) throw "No wallet!";
  const wallet = new JWKWallet(jwk);
  return arDriveFactory({ wallet });
};

const createDrive = async (arDrive: ArDrive, driveName: string) => {
  const createDriveResult = await arDrive.createPublicDrive({ driveName });
  console.log("Drive created: ", createDriveResult);
  console.log(createDriveResult);
  return createDriveResult;
};

const uploadFileOrFoler = async (
  arDrive: ArDrive,
  path: string,
  destFolderEID: string
) => {
  const wrappedEntity = wrapFileOrFolder(path);
  const destFolderId = EID(destFolderEID);
  const uploadFileResult = await arDrive.uploadAllEntities({
    entitiesToUpload: [{ wrappedEntity, destFolderId }],
  });
  console.log("File or filder uploaded: ", uploadFileResult);
  console.log(uploadFileResult);
  return uploadFileResult;
};

const main = async () => {
  console.log("Init ArDrive...");
  const arDrive = getArDriveFactory(jwk);

  //   console.log("Creating Drive...");
  //   const driveResult = await createDrive(arDrive, "My-Drive");

  console.log("Uploading Files or Folders...");
  const uploadResult = uploadFileOrFoler(
    arDrive,
    "./dist",
    "c76e2605-7029-4f9e-ac4a-a2f382858a6d" // Previously created drive root folder
  );
};

main().then(console.log);
