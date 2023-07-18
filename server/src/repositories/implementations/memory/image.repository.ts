import { CreateImageDTO } from "../../../dtos/image/create-image.dto";
import { Image } from "../../../entities/image.entity";
import { delay, generateRandomId } from "../../../utils";
import { IImageRepository } from "../../iimage.repository";

const images = [] as Image[];
const MemoryImageRepository: IImageRepository = {
  getImage: async (id: string) => {
    await delay();
    const image = images.find((image) => image.id === id);

    return image || undefined;
  },
  getImages: async () => {
    await delay();
    return images;
  },
  getUserImages: async (userId: string) => {
    await delay();
    const userImages = images.filter((image) => image.userId === userId);

    return userImages;
  },
  createImage: async (image: CreateImageDTO) => {
    await delay();
    const imageCreated = {
      ...image,
      id: generateRandomId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Image;

    images.push(imageCreated);

    return imageCreated;
  },
  deleteImage: async (id: string) => {
    await delay();
    const imageIndex = images.findIndex((image) => image.id === id);

    if (imageIndex === -1) throw new Error("Image not found");

    const deleted = images.splice(imageIndex, 1);

    return deleted[0];
  },
};

const clearImageMemory = async () => {
  await delay();
  images.splice(0, images.length);
};

export { MemoryImageRepository, clearImageMemory };
