import deleteFile from '../../firebase copy/deleteFile';

const deleteImages = async (images, userId) => {
  if (images.length > 0) {
    const promises = images.map((imgURL) => {
      const imgName = imgURL?.split(`${userId}%2F`)[1]?.split('?')[0];
      return deleteFile(`rooms/${userId}/${imgName}`);
    });
    try {
      await Promise.all(promises);
    } catch (error) {
      console.log(error);
    }
  }
};

export default deleteImages;
