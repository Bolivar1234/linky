import * as Yup from 'yup';

export interface ImageBlockConfig {
  src: string;
}

export const imageBlockDefaults: ImageBlockConfig = {
  src: 'https://cdn.giv.ee/default-data/image.png',
};

export const ImageSchema = Yup.object().shape({
  src: Yup.string().required('Please provide an image URL.'),
});
