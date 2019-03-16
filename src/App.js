import React, { Component } from 'react';

import { uniqueId } from 'lodash';
import fileSize from 'filesize';

import GlobalStyle from './styles/global';
import { Container, Content } from './styles'

import Upload from './components/upload';
import FileList from './components/filelist';
import Loader from './components/loader'

import api from './services/api';



class App extends Component {

	state = {
		uploadedFiles: [],
		loading: false

	}

	async componentDidMount() {
		this.setState({
			loading: true
		})
		const response = await api.get('images');

		this.setState({
			uploadedFiles: response.data.map(file => ({
				id: file._id,
				name: file.name,
				readableSize: fileSize(file.size),
				preview: file.url,
				url: file.url,
				uploaded: true
			})),
			loading: false
		});
	}

	componentWillUnmount(){
		this.state.uploadedFiles.forEach(file=>{
			if(file.file){
				URL.revokeObjectURL(file.preview);
			}
		})
	}

	handleUpload = (files) => {
		const uploadedFiles = files.map(file => ({
			file,
			id: uniqueId(),
			name: file.name,
			readableSize: fileSize(file.size),
			preview: URL.createObjectURL(file),
			progress: 0,
			uploaded: false,
			error: false,
			url: null
		}));

		this.setState({
			uploadedFiles: [...this.state.uploadedFiles, ...uploadedFiles]
		});

		uploadedFiles.forEach(this.processUpload);
	}

	updateFile = (id, data) => {
		this.setState({
			uploadedFiles: this.state.uploadedFiles.map(file => {
				return id === file.id ? { ...file, ...data } : file;
			})
		})
	}

	processUpload = (file) => {
		const data = new FormData();
		data.append('file', file.file, file.name);
		api.post('images', data, {
			onUploadProgress: e => {
				const progress = parseInt(Math.round((e.loaded * 100) / e.total));
				this.updateFile(file.id, {
					progress
				})
			}
		}).then((response) => {
			this.updateFile(file.id, {
				uploaded: true,
				id: response.data._id,
				url: response.data.url
			})
		}).catch((error) => {
			console.log(error);
			const { response } = error;
			this.updateFile(file.id, {
				error: true,
				errorMessage: response ? response.data.reason : error.message
			});
		});
	}

	handleDelete = async (file) => {
		if (file.uploaded) {
			await api.delete(`images/${file.id}`);
		}
		this.setState({
			uploadedFiles: this.state.uploadedFiles.filter(f => {
				return f.id !== file.id
			})
		})
	}

	render() {

		const { loading, uploadedFiles } = this.state;

		return (
			<Container>
				<Content>
					<Upload onUpload={this.handleUpload} />
					{loading && (
						<Loader />
					)}
					{(!loading || !!uploadedFiles.length) && (
						<FileList files={uploadedFiles} onDelete={this.handleDelete} />
					)}
				</Content>
				<GlobalStyle />
			</Container>
		);
	}
}

export default App;
