// Operating System Compatibility Matrix
// Simple compatibility data showing which OS works with which cloud provider
// Updated for 2025 with current compatibility information

export const operatingSystemSupport = {
  providers: {
    aws: {
      name: "AWS EC2 & Managed",
      description: "Amazon Web Services EC2 and managed services",
      supportMatrix: {
        linux: {
          name: "Linux (Various Distros)",
          support: "Yes",
          notes: "Includes Amazon Linux, RHEL, Ubuntu, CentOS, Debian; Oracle Linux supported via AMS"
        },
        windows: {
          name: "Windows Server",
          support: "Yes",
          notes: "Various versions supported (2012, 2016, 2019, 2022, plus limited legacy 2008), SSM agent requirements noted"
        },
        macos: {
          name: "macOS",
          support: "Yes",
          notes: "Via EC2 Mac instances for Mojave, Catalina, Big Sur, Monterey, Ventura, Sonoma"
        },
        freebsd: {
          name: "FreeBSD",
          support: "Yes",
          notes: "Officially supported as EC2 AMI since 2012"
        },
        raspberrypi: {
          name: "Others (e.g., Raspberry Pi OS)",
          support: "Some",
          notes: "AWS SSM supports Raspberry Pi OS on ARM via Systems Manager targeting devices"
        }
      }
    },
    
    gcp: {
      name: "GCP Compute Engine",
      description: "Google Cloud Platform Compute Engine",
      supportMatrix: {
        linux: {
          name: "Linux (Various Distros)",
          support: "Yes",
          notes: "General support for 64-bit Linux distributions; migrate-to-VM supports RHEL, CentOS, Ubuntu, Debian"
        },
        windows: {
          name: "Windows Server",
          support: "Yes",
          notes: "Standard Windows Server offerings available in Compute Engine environments"
        },
        macos: {
          name: "macOS",
          support: "No",
          notes: "Not available"
        },
        freebsd: {
          name: "FreeBSD",
          support: "Limited",
          notes: "Not standard; possible via custom images (not formally documented)"
        },
        raspberrypi: {
          name: "Others (e.g., Raspberry Pi OS)",
          support: "Rare",
          notes: "Rare or custom support"
        }
      }
    },
    
    azure: {
      name: "Azure VMs",
      description: "Microsoft Azure Virtual Machines",
      supportMatrix: {
        linux: {
          name: "Linux (Various Distros)",
          support: "Yes",
          notes: "Supports most mainstream Linux versions across distributions (Red Hat, Ubuntu, SUSE, etc.)"
        },
        windows: {
          name: "Windows Server",
          support: "Yes",
          notes: "Strong support for Windows Server through VM infrastructure"
        },
        macos: {
          name: "macOS",
          support: "No",
          notes: "Not supported"
        },
        freebsd: {
          name: "FreeBSD",
          support: "Limited",
          notes: "Not standard"
        },
        raspberrypi: {
          name: "Others (e.g., Raspberry Pi OS)",
          support: "Rare",
          notes: "Rare support"
        }
      }
    },
    
    ibm: {
      name: "IBM Cloud",
      description: "IBM Cloud Virtual Servers",
      supportMatrix: {
        linux: {
          name: "Linux (Various Distros)",
          support: "Yes",
          notes: "Common support for Linux variants typical in enterprise deployments"
        },
        windows: {
          name: "Windows Server",
          support: "Yes",
          notes: "Available via Hyper-V and bare-metal offerings"
        },
        macos: {
          name: "macOS",
          support: "No",
          notes: "Not supported"
        },
        freebsd: {
          name: "FreeBSD",
          support: "Limited",
          notes: "Not standard"
        },
        raspberrypi: {
          name: "Others (e.g., Raspberry Pi OS)",
          support: "Rare",
          notes: "Rare support"
        }
      }
    },
    
    oracle: {
      name: "Oracle Cloud",
      description: "Oracle Cloud Infrastructure",
      supportMatrix: {
        linux: {
          name: "Linux (Various Distros)",
          support: "Yes",
          notes: "Oracle Linux fully supported; general Linux compatibility expected"
        },
        windows: {
          name: "Windows Server",
          support: "Yes",
          notes: "Windows OS support available, especially via hybrid setups"
        },
        macos: {
          name: "macOS",
          support: "No",
          notes: "Not supported"
        },
        freebsd: {
          name: "FreeBSD",
          support: "Limited",
          notes: "Not standard"
        },
        raspberrypi: {
          name: "Others (e.g., Raspberry Pi OS)",
          support: "Rare",
          notes: "Rare support"
        }
      }
    }
  },
  
  // Support level definitions
  supportLevels: {
    yes: {
      label: "Yes",
      description: "Supported and available",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    limited: {
      label: "Limited",
      description: "Limited or custom support available",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50"
    },
    some: {
      label: "Some",
      description: "Some support available",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    rare: {
      label: "Rare",
      description: "Rare or custom support",
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    no: {
      label: "No",
      description: "Not supported or available",
      color: "text-red-600",
      bgColor: "bg-red-50"
    }
  },
  
  // Operating system categories
  osCategories: {
    linux: {
      name: "Linux",
      description: "Various Linux distributions",
      icon: "🐧"
    },
    windows: {
      name: "Windows",
      description: "Microsoft Windows Server",
      icon: "🪟"
    },
    apple: {
      name: "Apple",
      description: "Apple macOS operating systems",
      icon: "🍎"
    },
    bsd: {
      name: "BSD",
      description: "Berkeley Software Distribution variants",
      icon: "🦊"
    },
    embedded: {
      name: "Embedded",
      description: "Embedded and IoT operating systems",
      icon: "📱"
    }
  }
};

export default operatingSystemSupport;
