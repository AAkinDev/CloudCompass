// Operating System Support Matrix
// Comprehensive OS support data for all major cloud providers
// Updated for 2025 with current support information

export const operatingSystemSupport = {
  providers: {
    aws: {
      name: "Amazon Web Services (AWS)",
      description: "AWS provides extensive OS support with custom AMIs and marketplace images",
      supportMatrix: {
        windows: {
          name: "Windows",
          versions: ["Windows Server 2019", "Windows Server 2022", "Windows 11", "Windows 10"],
          support: "Full",
          notes: "Official Microsoft Windows Server images, custom AMIs available"
        },
        centos: {
          name: "CentOS",
          versions: ["CentOS 7", "CentOS 8", "CentOS Stream"],
          support: "Full",
          notes: "Community-supported, CentOS 7 EOL in 2024, CentOS Stream recommended"
        },
        cloudlinux: {
          name: "CloudLinux",
          versions: ["CloudLinux 7", "CloudLinux 8", "CloudLinux 9"],
          support: "Full",
          notes: "Specialized hosting OS with enhanced security and stability"
        },
        ubuntu: {
          name: "Ubuntu",
          versions: ["Ubuntu 20.04 LTS", "Ubuntu 22.04 LTS", "Ubuntu 24.04 LTS"],
          support: "Full",
          notes: "Canonical official images, extensive marketplace offerings"
        },
        oracle: {
          name: "Oracle Linux",
          versions: ["Oracle Linux 7", "Oracle Linux 8", "Oracle Linux 9"],
          support: "Full",
          notes: "Oracle-optimized images with enhanced performance"
        },
        rhel: {
          name: "Red Hat Enterprise Linux",
          versions: ["RHEL 7", "RHEL 8", "RHEL 9"],
          support: "Full",
          notes: "Enterprise-grade Linux with AWS integration"
        },
        suse: {
          name: "SUSE Linux",
          versions: ["SUSE Linux Enterprise Server 15", "SUSE Linux Enterprise Server 16"],
          support: "Full",
          notes: "Enterprise Linux with long-term support"
        },
        debian: {
          name: "Debian",
          versions: ["Debian 11", "Debian 12"],
          support: "Full",
          notes: "Community-driven Linux distribution"
        },
        amazon: {
          name: "Amazon Linux",
          versions: ["Amazon Linux 2", "Amazon Linux 2023"],
          support: "Full",
          notes: "AWS-optimized Linux distribution with enhanced security"
        }
      }
    },
    
    azure: {
      name: "Microsoft Azure",
      description: "Azure provides comprehensive OS support with Microsoft-first approach",
      supportMatrix: {
        windows: {
          name: "Windows",
          versions: ["Windows Server 2019", "Windows Server 2022", "Windows 11", "Windows 10"],
          support: "Full",
          notes: "Native Microsoft support with Azure-optimized images"
        },
        centos: {
          name: "CentOS",
          versions: ["CentOS 7", "CentOS 8", "CentOS Stream"],
          support: "Limited",
          notes: "Community support, Microsoft recommends alternatives"
        },
        cloudlinux: {
          name: "CloudLinux",
          versions: ["CloudLinux 7", "CloudLinux 8", "CloudLinux 9"],
          support: "Limited",
          notes: "Available but not officially supported by Microsoft"
        },
        ubuntu: {
          name: "Ubuntu",
          versions: ["Ubuntu 20.04 LTS", "Ubuntu 22.04 LTS", "Ubuntu 24.04 LTS"],
          support: "Full",
          notes: "Canonical partnership with Azure-optimized images"
        },
        oracle: {
          name: "Oracle Linux",
          versions: ["Oracle Linux 7", "Oracle Linux 8", "Oracle Linux 9"],
          support: "Full",
          notes: "Oracle Cloud Infrastructure integration available"
        },
        rhel: {
          name: "Red Hat Enterprise Linux",
          versions: ["RHEL 7", "RHEL 8", "RHEL 9"],
          support: "Full",
          notes: "Microsoft-Red Hat partnership with enhanced support"
        },
        suse: {
          name: "SUSE Linux",
          versions: ["SUSE Linux Enterprise Server 15", "SUSE Linux Enterprise Server 16"],
          support: "Full",
          notes: "Enterprise Linux with Microsoft integration"
        },
        debian: {
          name: "Debian",
          versions: ["Debian 11", "Debian 12"],
          support: "Full",
          notes: "Community Linux with Azure marketplace support"
        },
        amazon: {
          name: "Amazon Linux",
          versions: ["Amazon Linux 2", "Amazon Linux 2023"],
          support: "None",
          notes: "AWS-specific distribution, not available on Azure"
        }
      }
    },
    
    gcp: {
      name: "Google Cloud Platform",
      description: "GCP provides extensive OS support with Google-optimized images",
      supportMatrix: {
        windows: {
          name: "Windows",
          versions: ["Windows Server 2019", "Windows Server 2022", "Windows 11", "Windows 10"],
          support: "Full",
          notes: "Microsoft partnership with Google-optimized Windows images"
        },
        centos: {
          name: "CentOS",
          versions: ["CentOS 7", "CentOS 8", "CentOS Stream"],
          support: "Full",
          notes: "Community support with Google Cloud marketplace"
        },
        cloudlinux: {
          name: "CloudLinux",
          versions: ["CloudLinux 7", "CloudLinux 8", "CloudLinux 9"],
          support: "Limited",
          notes: "Available but not officially supported by Google"
        },
        ubuntu: {
          name: "Ubuntu",
          versions: ["Ubuntu 20.04 LTS", "Ubuntu 22.04 LTS", "Ubuntu 24.04 LTS"],
          support: "Full",
          notes: "Canonical partnership with Google-optimized Ubuntu images"
        },
        oracle: {
          name: "Oracle Linux",
          versions: ["Oracle Linux 7", "Oracle Linux 8", "Oracle Linux 9"],
          support: "Full",
          notes: "Oracle partnership with Google Cloud integration"
        },
        rhel: {
          name: "Red Hat Enterprise Linux",
          versions: ["RHEL 7", "RHEL 8", "RHEL 9"],
          support: "Full",
          notes: "Red Hat partnership with Google Cloud support"
        },
        suse: {
          name: "SUSE Linux",
          versions: ["SUSE Linux Enterprise Server 15", "SUSE Linux Enterprise Server 16"],
          support: "Full",
          notes: "Enterprise Linux with Google Cloud marketplace"
        },
        debian: {
          name: "Debian",
          versions: ["Debian 11", "Debian 12"],
          support: "Full",
          notes: "Community Linux with Google Cloud optimization"
        },
        amazon: {
          name: "Amazon Linux",
          versions: ["Amazon Linux 2", "Amazon Linux 2023"],
          support: "None",
          notes: "AWS-specific distribution, not available on GCP"
        }
      }
    },
    
    oracle: {
      name: "Oracle Cloud Infrastructure",
      description: "Oracle Cloud provides comprehensive OS support with Oracle-optimized images",
      supportMatrix: {
        windows: {
          name: "Windows",
          versions: ["Windows Server 2019", "Windows Server 2022", "Windows 11", "Windows 10"],
          support: "Full",
          notes: "Microsoft partnership with Oracle Cloud optimization"
        },
        centos: {
          name: "CentOS",
          versions: ["CentOS 7", "CentOS 8", "CentOS Stream"],
          support: "Limited",
          notes: "Community support, Oracle recommends Oracle Linux"
        },
        cloudlinux: {
          name: "CloudLinux",
          versions: ["CloudLinux 7", "CloudLinux 8", "CloudLinux 9"],
          support: "Limited",
          notes: "Available but not officially supported by Oracle"
        },
        ubuntu: {
          name: "Ubuntu",
          versions: ["Ubuntu 20.04 LTS", "Ubuntu 22.04 LTS", "Ubuntu 24.04 LTS"],
          support: "Full",
          notes: "Canonical partnership with Oracle Cloud marketplace"
        },
        oracle: {
          name: "Oracle Linux",
          versions: ["Oracle Linux 7", "Oracle Linux 8", "Oracle Linux 9"],
          support: "Full",
          notes: "Oracle's flagship Linux distribution with native optimization"
        },
        rhel: {
          name: "Red Hat Enterprise Linux",
          versions: ["RHEL 7", "RHEL 8", "RHEL 9"],
          support: "Full",
          notes: "Enterprise Linux with Oracle Cloud integration"
        },
        suse: {
          name: "SUSE Linux",
          versions: ["SUSE Linux Enterprise Server 15", "SUSE Linux Enterprise Server 16"],
          support: "Full",
          notes: "Enterprise Linux with Oracle Cloud marketplace"
        },
        debian: {
          name: "Debian",
          versions: ["Debian 11", "Debian 12"],
          support: "Full",
          notes: "Community Linux with Oracle Cloud support"
        },
        amazon: {
          name: "Amazon Linux",
          versions: ["Amazon Linux 2", "Amazon Linux 2023"],
          support: "None",
          notes: "AWS-specific distribution, not available on Oracle Cloud"
        }
      }
    },
    
    ibm: {
      name: "IBM Cloud",
      description: "IBM Cloud provides enterprise-focused OS support with IBM-optimized images",
      supportMatrix: {
        windows: {
          name: "Windows",
          versions: ["Windows Server 2019", "Windows Server 2022", "Windows 11", "Windows 10"],
          support: "Full",
          notes: "Microsoft partnership with IBM Cloud optimization"
        },
        centos: {
          name: "CentOS",
          versions: ["CentOS 7", "CentOS 8", "CentOS Stream"],
          support: "Limited",
          notes: "Community support, IBM recommends enterprise alternatives"
        },
        cloudlinux: {
          name: "CloudLinux",
          versions: ["CloudLinux 7", "CloudLinux 8", "CloudLinux 9"],
          support: "Limited",
          notes: "Available but not officially supported by IBM"
        },
        ubuntu: {
          name: "Ubuntu",
          versions: ["Ubuntu 20.04 LTS", "Ubuntu 22.04 LTS", "Ubuntu 24.04 LTS"],
          support: "Full",
          notes: "Canonical partnership with IBM Cloud marketplace"
        },
        oracle: {
          name: "Oracle Linux",
          versions: ["Oracle Linux 7", "Oracle Linux 8", "Oracle Linux 9"],
          support: "Full",
          notes: "Oracle partnership with IBM Cloud integration"
        },
        rhel: {
          name: "Red Hat Enterprise Linux",
          versions: ["RHEL 7", "RHEL 8", "RHEL 9"],
          support: "Full",
          notes: "IBM-Red Hat partnership with enhanced enterprise support"
        },
        suse: {
          name: "SUSE Linux",
          versions: ["SUSE Linux Enterprise Server 15", "SUSE Linux Enterprise Server 16"],
          support: "Full",
          notes: "Enterprise Linux with IBM Cloud marketplace"
        },
        debian: {
          name: "Debian",
          versions: ["Debian 11", "Debian 12"],
          support: "Full",
          notes: "Community Linux with IBM Cloud support"
        },
        amazon: {
          name: "Amazon Linux",
          versions: ["Amazon Linux 2", "Amazon Linux 2023"],
          support: "None",
          notes: "AWS-specific distribution, not available on IBM Cloud"
        }
      }
    }
  },
  
  // Support level definitions
  supportLevels: {
    full: {
      label: "Full Support",
      description: "Official support with optimized images, documentation, and technical assistance",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    limited: {
      label: "Limited Support",
      description: "Community support or third-party images available",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50"
    },
    none: {
      label: "Not Supported",
      description: "Not officially supported or available",
      color: "text-red-600",
      bgColor: "bg-red-50"
    }
  },
  
  // Operating system categories
  osCategories: {
    windows: {
      name: "Windows",
      description: "Microsoft Windows operating systems",
      icon: "🪟"
    },
    linux: {
      name: "Linux",
      description: "Various Linux distributions",
      icon: "🐧"
    },
    enterprise: {
      name: "Enterprise",
      description: "Enterprise-grade operating systems",
      icon: "🏢"
    },
    community: {
      name: "Community",
      description: "Community-driven operating systems",
      icon: "👥"
    }
  }
};

export default operatingSystemSupport;
