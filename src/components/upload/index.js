import React, { Component } from 'react';

import DropZone from 'react-dropzone';

import { DropContainer, UploadMessage } from './styles';

export default class Upload extends Component {

    renderDragMesasge = (isDragActive, isDragReject) => {
        let message = "";
        let type = "";
        if (!isDragActive) {
            message = "Faça upload de suas imagens arrastando-as aqui..."
        } else if (isDragReject) {
            type = "error"
            message = "Arquivo não suportado!"
        } else {
            type = "success"
            message = "Solte os arquivos para realizar o upload";
        }
        return <UploadMessage type={type}>{message}</UploadMessage>
    }

    render() {

        const { onUpload } = this.props;

        return (
            <DropZone accept="image/*" onDropAccepted={onUpload} >
                {({ getRootProps, getInputProps, isDragActive, isDragReject }) =>
                    <DropContainer
                        {...getRootProps()}
                        isDragActive={isDragActive}
                        isDragReject={isDragReject}
                    >
                        <input {...getInputProps()} />


                        {this.renderDragMesasge(isDragActive, isDragReject)}

                    </DropContainer>
                }
            </DropZone>
        );
    }
}