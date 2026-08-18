# Computer vision continued
## Background subtraction
- First we take image of scene without the object
- ![alt text](image.png)
- And subtrzct the scene with the object
- ![alt text](image-1.png)
- ![alt text](image-2.png)
- We assume that the objects color will differ from background, and backgrund wont change
- It would not work vry well on a scene like this one:
    - ![alt text](image-3.png)

## Frame differencing
- Used for detecting movement
- Comparing current frame with previous frame
- ![alt text](image-4.png)