# Deploy Website on AWS
## About the Project
- This project is a practice of deploying a fullstack website on AWS using a variety of AWS features.
- The web app is credited to Na Lou and Zhangzhang Li. Refer to the second part of this file for more detailed information about the web app. 

## AWS Features
EC2 | VPC | Security Group | Internet Gateway | Load Balancer | Auto-scaling Group

## IaaS Architecture
![AWS Architecture](https://drive.google.com/uc?export=view&id=10isJM9JP9H0pp-Egaz-UdXdjTsuE8hSB)

## IaaS and Deployment Explanation
- This project uses two VPCs, one VPC contains an EC2 instance that hosts the original web app, and the other VPC is used for the infrastructure. Using two VPCs can grant different accesses to the development team and infrastructure team and to ensure the security of this project. 
- For auto scaling, the group should have 2 - 6 instances to accommodate different loads to the web app. The scaling policy is to keep the aggregated CPU utilization across all servers at 80%. 
- For deployment, first deploy the web app in an EC2 instance, configure and test the app. Then build an AMI of the instance. The auto scaling group will create new instances using the AMI built. 

## Demo
To avoid the high cost, this project has been taken down from AWS. Please refer to the demos to see how this app is running on AWS. 
- Web App on AWS: https://youtu.be/ZjJIaf_jo7k (video credit to Na Lou)
- AWS Auto-scaling Group: https://www.youtube.com/watch?v=iZLVcIlVAXs
  - This video aims to demonstrate that the auto-scaling group works as expected. The instance capacity range is 2-6 and the scaling policy is that CUP utilization is 80%. Therefore, if we terminate one of the instances, the auto-scaling group will automatically launch another one. Also, the actual CPU utilization is only around 0.3% so there won't be any more instances launched automatically. 
### Home Page
![Home Page](https://drive.google.com/uc?export=view&id=1_gE8AjJfvIF1wW1q6QX-WatwBg4PhBo1)
### Sign Up
![Sign Up](https://drive.google.com/uc?export=view&id=1RRk6mQmuOZkJBxHmrvpn29r7zZwkGXso)
### Sign In
![Sign In](https://drive.google.com/uc?export=view&id=1paU5zEzOtAoEc87GiWR45i1LIVnNNo45)
### Beer Info Display
![Beer Info](https://drive.google.com/uc?export=view&id=15NXww7H7PNOmLSFXHHmc0kaWrt8oUQVk)
### Comments
![Comments](https://drive.google.com/uc?export=view&id=1BN4BHGQtKOMPrEk3S8UPJYaYavXbM0pY)

# Web Application
## Author
Zhangzhang Li & Na Lou
https://github.com/gloria20070108/biru-biru

## Phote Credit
Chuan Zhang
George Cox on Unsplash: https://unsplash.com/photos/l9Z93oauxgs

## Tech
React | HTML | CSS | JS | MongoDB | Express | NodeJS | Passport | Heroku

## Web Application Functionalities
- Authentication (Register/Login)
- Once the user has logged in, he/she can review beer’s information and comments. 
- Users are allowed to submit their comments to a beer
- Each beer will have a like/dislike button and user can sort beers by likes
- Users could filter different types of beer.

## Run the Web App Locally
- git clone this repo and go to the project root directory
- run `yarn install`
- run `yarn build`
- run `yarn start`
- Check http://localhost:3001
