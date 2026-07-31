# Computer vision
## Applications of computer vision
- Post office letter routing
- Self driving cars
- Medical imaging
- Face recognition in smartphones
- Sports games use it to collect infromation about each players goals/passes etc

## Brightness tracking
- Looping over pixels in image
- Fiding brightest ones
- ![alt text](image.png)
- Under assumption that the object we track is the absolute brightest object

## Color tracking
- Similar to brightness tracking, but instead of looking for bright pixels, were looking for pixels close to any specific color
- ![alt text](image-1.png)
- ![alt text](image-2.png)
- We can do it by tracking rgb colors as points in 3D space, and then find distance between them
- ![alt text](image-3.png)
- We replace q and p in formula with colors:
- 2D
    - ![alt text](image-4.png)
- 3D
    - ![alt text](image-5.png)

## Color tracking with blobs (objects)
- 