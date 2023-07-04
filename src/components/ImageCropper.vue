<template>
	<main>
		<section v-if="!croppedImage">
			<input
				label="Imagem" 
				type="file" 
				@change='onFileChange'
				accept="image/png, image/jpeg"
				style="width: 100%; margin-bottom: 16px;"
			/>
			<cropper
				ref="cropper"
				class="cropper"
				:src="uploadedImage"
				:stencil-component="$options.components.CircleStencil"
			/>
			<button 
				@click="crop"
				style="margin-bottom: 16px;">
				Crop
			</button>	
		</section>
		
		<section v-if="croppedImage">
			<div style="text-align: center">
				<div>Raw Image:</div>
				<img
					:src='croppedImage' 
					class="image-preview"
				/>

				<div>Compressed Image:</div>
				<img
					:src='compressedImage' 
					class="image-preview"
				/>
			</div>

			<button
				@click="croppedImage = null; compressedImage = null;">
				Cancel 
			</button>
		</section>
	</main>  
</template>

<script>
import { Cropper, CircleStencil } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

export default {
	components: {
		Cropper,
		CircleStencil,
	},
	data() {
	    return {
				croppedImage: null,
				compressedImage: null,
				uploadedImage: null,
	    }
	},
	methods: {
		async crop() {
			const { coordinates, canvas, } = this.$refs.cropper.getResult();
			this.coordinates = coordinates;

			if (canvas) {
				this.croppedImage = canvas.toDataURL(); 
				this.compressedImage = await this.resizeDataUrlImage({
					dataUrl: canvas.toDataURL(),
					width: 100,
					height: 100,
				});
			};
		},
		onFileChange(event) {
			const input = event.target;
			if (input.files && input.files[0]) {
				const reader = new FileReader();
				reader.onload = (e) => {
					this.uploadedImage = e.target.result;
				};

				reader.readAsDataURL(input.files[0]);
			}
		},
		resizeDataUrlImage({ dataUrl, width, height }) {
			return new Promise((resolve) => {
				const img = new Image();

				img.onload = () => {
					const canvas = document.createElement('canvas');
					const ctx = canvas.getContext('2d');

					canvas.width = width;
					canvas.height = height;

					ctx.drawImage(img, 0, 0, width, height);

					const resizedDataUrl = canvas.toDataURL();
					resolve(resizedDataUrl);
				};

				img.src = dataUrl;
			});
		}
	},
}
</script>

<style>
.cropper {
	height: 600px;
	width: 600px;
	background: #DDD;
	margin-bottom: 16px;
}

.image-preview {
	display: inline-block;
	border-radius: 50%;
	width: 300px;
	height: 300px;
}

button {
	display: block;
}
</style>