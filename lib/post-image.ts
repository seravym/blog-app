// Foto yang dipakai bergiliran untuk setiap post, diambil dari public/images.
const POST_IMAGES = [
  '/images/cat2.jpg',
  '/images/bunny1.jpg',
  '/images/cat3.jpg',
  '/images/bunnies.jpg',
  '/images/cat4.jpg',
  '/images/bunny3.jpg',
  '/images/cat1.jpg',
  '/images/catburger.jpg',
  '/images/bunny2.jpg',
  '/images/cat5.jpg',
  '/images/1.jpg',
  '/images/bun.jpg',
];

export function postImage(id: number) {
  const index = Math.abs(id - 1) % POST_IMAGES.length;
  return POST_IMAGES[index];
}
