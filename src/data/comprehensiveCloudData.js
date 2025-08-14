// Comprehensive Cloud Provider Data
// Based on real-time information from AWS, Google Cloud, Azure, Oracle Cloud, and IBM Cloud

export const comprehensiveCloudData = {
  providers: {
    aws: {
      name: "Amazon Web Services (AWS)",
      logo: "/assets/logos/aws-logo.png",
      website: "https://aws.amazon.com/",
      marketShare: "31%",
      position: "Market Leader",
      description: "The world's most comprehensive and broadly adopted cloud platform",
      strengths: [
        "Broadest and deepest set of cloud capabilities",
        "200+ services including Amazon Bedrock, EC2, and S3",
        "Largest community with millions of active customers",
        "Most proven operational expertise",
        "117 Availability Zones within 37 Geographic Regions"
      ],
      keyServices: {
        ai: {
          name: "Amazon Bedrock",
          description: "Deploy and operate agents using any framework or model",
          features: ["Generative AI", "AgentCore", "OpenAI models", "SageMaker"]
        },
        compute: {
          name: "Amazon EC2",
          description: "Virtual servers in the cloud with 200+ services",
          features: ["Widest variety of compute instances", "Custom silicon", "Best price performance"]
        },
        storage: {
          name: "Amazon S3",
          description: "Object storage built to retrieve any amount of data from anywhere",
          features: ["Multiple storage classes", "99.999999999% durability", "Global availability"]
        },
        security: {
          name: "AWS Security",
          description: "300+ security, compliance, and governance services",
          features: ["143 security standards", "Compliance certifications", "Government-grade security"]
        }
      },
      freeTier: {
        credits: "$200",
        services: "200+ services",
        duration: "12 months",
        description: "Start your AWS Cloud journey with $200 credits"
      },
      pricing: {
        model: "Pay-as-you-go",
        savings: "Up to 90% with reserved instances",
        calculator: "https://calculator.aws/"
      }
    },
    gcp: {
      name: "Google Cloud Platform",
      logo: "/assets/logos/gcp-logo.png",
      website: "https://cloud.google.com/",
      marketShare: "11%",
      position: "AI/ML Leader",
      description: "The new way to cloud starts here with AI-first approach",
      strengths: [
        "AI and machine learning leadership",
        "150+ products with Vertex AI",
        "Custom silicon for better performance",
        "Developer-centric platform",
        "Energy efficiency focus"
      ],
      keyServices: {
        ai: {
          name: "Vertex AI",
          description: "Fully managed AI platform enhanced by Gemini",
          features: ["Gemini 2.5 Flash and Pro", "200+ foundation models", "AI ecosystem partners"]
        },
        compute: {
          name: "Compute Engine",
          description: "Customizable virtual machines with Axion C4A instances",
          features: ["65% better price-performance", "Custom silicon", "Global infrastructure"]
        },
        storage: {
          name: "Cloud Storage",
          description: "Object storage for any type and amount of data",
          features: ["Multi-region storage", "Transfer services", "Integrated with other GCP products"]
        },
        database: {
          name: "Cloud SQL & AlloyDB",
          description: "Fully-managed database services",
          features: ["MySQL, PostgreSQL, SQL Server", "99.999% availability SLA", "Enterprise workloads"]
        }
      },
      freeTier: {
        credits: "$300",
        services: "20+ products",
        duration: "Always free",
        description: "Get $300 in free credits and free usage of 20+ products"
      },
      pricing: {
        model: "Transparent pricing",
        savings: "Sustained use discounts",
        calculator: "https://cloud.google.com/pricing"
      }
    },
    azure: {
      name: "Microsoft Azure",
      logo: "/assets/logos/azure-logo.png",
      website: "https://azure.microsoft.com/en-us/",
      marketShare: "25%",
      position: "Enterprise Focus",
      description: "Enterprise-grade cloud platform with seamless Windows integration",
      strengths: [
        "Enterprise and hybrid cloud leadership",
        "Seamless Windows/.NET integration",
        "Strong enterprise security",
        "Government and compliance focus",
        "Visual Studio integration"
      ],
      keyServices: {
        ai: {
          name: "Azure OpenAI",
          description: "Enterprise AI services with OpenAI integration",
          features: ["Cognitive Services", "Machine Learning", "AI Studio"]
        },
        compute: {
          name: "Azure Virtual Machines",
          description: "Scalable cloud computing with Windows/Linux support",
          features: ["Hybrid cloud", "Windows integration", "Enterprise security"]
        },
        storage: {
          name: "Azure Storage",
          description: "Comprehensive storage solutions for enterprise",
          features: ["Blob storage", "File storage", "Disk storage", "Archive storage"]
        },
        database: {
          name: "Azure SQL",
          description: "Managed SQL database services",
          features: ["SQL Database", "SQL Managed Instance", "SQL Edge"]
        }
      },
      freeTier: {
        credits: "$200",
        services: "40+ services",
        duration: "12 months",
        description: "Free account with $200 Azure credit"
      },
      pricing: {
        model: "Pay-as-you-go",
        savings: "Reserved instances and hybrid benefits",
        calculator: "https://azure.microsoft.com/pricing/calculator/"
      }
    },
    oracle: {
      name: "Oracle Cloud Infrastructure",
      logo: "/assets/logos/oracle-logo.png",
      website: "https://www.oracle.com/cloud/",
      marketShare: "3%",
      position: "Database Specialist",
      description: "High-performance cloud infrastructure with autonomous capabilities",
      strengths: [
        "Database leadership and expertise",
        "High-performance computing",
        "Autonomous services",
        "Enterprise focus",
        "Competitive pricing"
      ],
      keyServices: {
        database: {
          name: "Oracle Database",
          description: "World's leading database with autonomous capabilities",
          features: ["Autonomous Database", "MySQL", "PostgreSQL", "NoSQL"]
        },
        compute: {
          name: "Oracle Compute",
          description: "High-performance computing instances",
          features: ["Bare metal instances", "Virtual machines", "Autonomous Linux"]
        },
        storage: {
          name: "Oracle Storage",
          description: "High-performance storage solutions",
          features: ["Object storage", "Block storage", "File storage", "Archive storage"]
        },
        ai: {
          name: "Oracle AI",
          description: "AI and machine learning services",
          features: ["Oracle AI", "Machine Learning", "Data Science"]
        }
      },
      freeTier: {
        credits: "$300",
        services: "Always free services",
        duration: "Always free",
        description: "Free tier with $300 credits and always free services"
      },
      pricing: {
        model: "Universal credits",
        savings: "Competitive pricing with universal credits",
        calculator: "https://www.oracle.com/cloud/cost-estimator.html"
      }
    },
    ibm: {
      name: "IBM Cloud",
      logo: "/assets/logos/ibm-logo.png"
      website: "https://www.ibm.com/cloud/",
      marketShare: "2%",
      position: "Enterprise Solutions",
      description: "Enterprise-grade cloud with advanced AI and security",
      strengths: [
        "Enterprise and government focus",
        "Advanced AI with Watson",
        "Hybrid cloud leadership",
        "Industry-specific solutions",
        "Strong security and compliance"
      ],
      keyServices: {
        ai: {
          name: "Watson AI",
          description: "Advanced AI platform with enterprise capabilities",
          features: ["Watson Studio", "Watson Assistant", "Watson Discovery", "AI governance"]
        },
        compute: {
          name: "IBM Cloud Virtual Servers",
          description: "Scalable compute with enterprise features",
          features: ["Bare metal servers", "Virtual servers", "Kubernetes service"]
        },
        storage: {
          name: "IBM Cloud Storage",
          description: "Enterprise storage with security focus",
          features: ["Object storage", "Block storage", "File storage", "Backup services"]
        },
        security: {
          name: "IBM Cloud Security",
          description: "Advanced security and compliance services",
          features: ["Identity and access management", "Data protection", "Security monitoring"]
        }
      },
      freeTier: {
        credits: "$200",
        services: "40+ services",
        duration: "30 days",
        description: "Free account with $200 IBM Cloud credit"
      },
      pricing: {
        model: "Pay-as-you-go",
        savings: "Reserved instances and enterprise discounts",
        calculator: "https://www.ibm.com/cloud/pricing"
      }
    }
  },
  
  categories: {
    compute: {
      name: "Compute",
      description: "Virtual machines, containers, and serverless computing",
      services: {
        aws: ["EC2", "Lambda", "ECS", "EKS"],
        gcp: ["Compute Engine", "Cloud Run", "Cloud Functions", "GKE"],
        azure: ["Virtual Machines", "Azure Functions", "Container Instances", "AKS"],
        oracle: ["Compute Instances", "Container Engine", "Functions", "Autonomous Linux"],
        ibm: ["Virtual Servers", "Kubernetes Service", "Cloud Functions", "Code Engine"]
      }
    },
    storage: {
      name: "Storage",
      description: "Object, block, and file storage solutions",
      services: {
        aws: ["S3", "EBS", "EFS", "Glacier"],
        gcp: ["Cloud Storage", "Persistent Disk", "Filestore", "Transfer Service"],
        azure: ["Blob Storage", "Managed Disks", "File Storage", "Archive Storage"],
        oracle: ["Object Storage", "Block Storage", "File Storage", "Archive Storage"],
        ibm: ["Object Storage", "Block Storage", "File Storage", "Backup Services"]
      }
    },
    database: {
      name: "Database",
      description: "Managed database services and data warehousing",
      services: {
        aws: ["RDS", "DynamoDB", "Redshift", "Aurora"],
        gcp: ["Cloud SQL", "AlloyDB", "BigQuery", "Firestore"],
        azure: ["SQL Database", "Cosmos DB", "Synapse Analytics", "Redis Cache"],
        oracle: ["Autonomous Database", "MySQL", "PostgreSQL", "NoSQL"],
        ibm: ["Db2", "PostgreSQL", "MongoDB", "Redis"]
      }
    },
    ai: {
      name: "Artificial Intelligence",
      description: "Machine learning, AI services, and data analytics",
      services: {
        aws: ["SageMaker", "Bedrock", "Comprehend", "Rekognition"],
        gcp: ["Vertex AI", "Gemini", "AutoML", "BigQuery ML"],
        azure: ["Azure OpenAI", "Cognitive Services", "Machine Learning", "Synapse Analytics"],
        oracle: ["Oracle AI", "Machine Learning", "Data Science", "Autonomous Data Warehouse"],
        ibm: ["Watson AI", "Watson Studio", "Watson Assistant", "Watson Discovery"]
      }
    },
    networking: {
      name: "Networking",
      description: "Virtual networks, load balancing, and content delivery",
      services: {
        aws: ["VPC", "CloudFront", "Route 53", "API Gateway"],
        gcp: ["Virtual Private Cloud", "Cloud CDN", "Cloud DNS", "Cloud Load Balancing"],
        azure: ["Virtual Network", "Azure CDN", "DNS", "Application Gateway"],
        oracle: ["Virtual Cloud Network", "Load Balancer", "DNS", "API Gateway"],
        ibm: ["Virtual Private Cloud", "Cloud Internet Services", "DNS", "API Gateway"]
      }
    },
    security: {
      name: "Security",
      description: "Identity management, encryption, and compliance",
      services: {
        aws: ["IAM", "KMS", "CloudTrail", "GuardDuty"],
        gcp: ["Cloud IAM", "Cloud KMS", "Security Command Center", "Access Transparency"],
        azure: ["Azure AD", "Key Vault", "Security Center", "Sentinel"],
        oracle: ["IAM", "Vault", "Security Zones", "Cloud Guard"],
        ibm: ["IAM", "Key Protect", "Security Advisor", "Cloud Pak for Security"]
      }
    }
  },
  
  comparisonMetrics: {
    marketShare: {
      aws: 31,
      azure: 25,
      gcp: 11,
      oracle: 3,
      ibm: 2,
      others: 28
    },
    globalRegions: {
      aws: 37,
      azure: 60,
      gcp: 35,
      oracle: 30,
      ibm: 20
    },
    availabilityZones: {
      aws: 117,
      azure: 200,
      gcp: 105,
      oracle: 60,
      ibm: 40
    },
    freeTierCredits: {
      aws: 200,
      gcp: 300,
      azure: 200,
      oracle: 300,
      ibm: 200
    }
  }
};

export default comprehensiveCloudData;

