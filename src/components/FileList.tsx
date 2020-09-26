import React, { Component } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

import { getFileList, downloadFile } from "../services/fileService";

class FileList extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      fileList: [],
    };
  }
  async componentDidMount() {
    const fileList = await getFileList();
    const objList = fileList.map((item) => {
      return {
        name: item,
      };
    });
    this.setState({
      fileList: objList,
    });
  }
  downloadTemplate(item: any) {
    return (
      <>
        <Button className="p-button-link" icon="pi pi-download" onClick={() => downloadFile(item.name)} />
      </>
    );
  }
  render() {
    return (
      <DataTable value={this.state.fileList}>
        <Column field="name" header="Name"></Column>
        <Column header="Download" body={this.downloadTemplate}></Column>
      </DataTable>
    );
  }
}

export default FileList;
