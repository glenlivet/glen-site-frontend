import { API_GET_FILELIST, API_GET_FILE } from "../constants/apis";
import { authHeaders } from "./authService";
import download from "downloadjs";

export const getFileList = async (): Promise<string[]> => {
    const resp = await fetch(API_GET_FILELIST, {
      headers: authHeaders()
    });
    return await resp.json();
}


export const downloadFile = async (name: string) => {
  const resp = await fetch(`${API_GET_FILE}/${name}`, {
    headers: authHeaders()
  });
  const blob = await resp.blob();
  download(blob, name);
}
