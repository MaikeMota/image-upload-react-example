import React from 'react';

import CircularProgressBar from 'react-circular-progressbar';
import { MdCheckCircle, MdError, MdLink, MdDelete } from 'react-icons/md';

import { Container, FileInfo, Preview, ActionButtons } from './styles';

const FileList = ({ files, onDelete }) => (
    <Container>
        {files.map(file =>
            (
                <li key={file.id}>
                    <FileInfo>
                        <Preview src={file.preview} />
                        <div>
                            <strong >
                                {file.name}
                            </strong>
                            <span>
                                {file.readableSize}
                            </span>
                            {file.error && (
                                <span className="error" >
                                    {file.errorMessage}
                                </span>
                            )}
                        </div>
                    </FileInfo>

                    <ActionButtons>
                        {!file.uploaded && !file.error && (
                            <CircularProgressBar
                                styles={{
                                    root: { width: 24 },
                                    path: { stroke: '#7159c1' }
                                }}
                                strokeWidth={10}
                                percentage={file.progress} />
                        )}
                        {file.url && (
                            <a href={file.url}
                                target="_blank"
                                rel="noopener noreferrer" >
                                <MdLink style={{ marginRight: 8 }} size={24} color="#222" />
                            </a>
                        )}
                        {(file.url || file.error) && (
                            <button> 
                                <MdDelete size={24} color={'#e57878'} onClick={onDelete.bind(this, file)} />
                            </button>
                        )}
                        {(file.file && file.uploaded) && (
                            <MdCheckCircle size={24} color="#78e5d5" />
                        )}
                        {file.error && (
                            <MdError size={24} color="#e57878" />
                        )}
                    </ActionButtons>
                </li>
            )
        )}
    </Container>
)

export default FileList;