# Image processing
## How pixels are stored
- ![alt text](image.png)
- ![alt text](image-1.png)
- ![alt text](image-2.png)
# Complex Filters
- ![alt text](image-3.png)
## 1D Convolution
- ![alt text](image-4.png)
- ![alt text](image-5.png)
- ![alt text](image-6.png)
- ![alt text](image-7.png)

## 2D Convolution (used in blur filter)
- ![alt text](image-8.png)
- ![alt text](image-9.png)
- ![alt text](image-10.png)
- ![alt text](image-11.png)
- ![alt text](image-12.png)

## Blur filters
- ![alt text](image-13.png)
- ![alt text](image-14.png)
- Gaussian blur is a more complicated which uses normal ditribution. Preserves edges better.
- Can be tuned by changing width of the kernel or changing standard deviation of normal distribution
- ![alt text](image-15.png)
- ![alt text](image-16.png)

## Edge detection filter
- ![alt text](image-21.png)
- ![alt text](image-17.png)
- ![alt text](image-18.png)
- With this kernel matrix, pixels that have same value neighbours are eliminated, made just black
- Pixels that have different neoghbours are amplified, turned white
- ![alt text](image-19.png)
- ![alt text](image-20.png)

## Sharpen filter
- Matrix has sum of 1, to maintain overall brightness of the image
- Boosting pixel when neighbours differ
- ![alt text](image-22.png)
- ![alt text](image-23.png)

## Advanced filters in GIMP
- GIMP is Open Source image editing software
- Good for exploring all the filters
- Allows matrix editing for fine tuning