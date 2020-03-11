export default async function getMenuData() {
  return [
    {
      title: "Dashboard",
      key: "dashboard",
      icon: "fe fe-bookmark",
      url: "/dashboard/analytics"
    },
    {
      title: "Publishers",
      key: "publishers",
      icon: "fe fe-bookmark",
      url: "/publishers",
      children: [
        {
          title: "Create Publishers",
          key: "create publishers",
          icon: "fe fe-bookmark",
          url: "/publisher/create"
        },
        // {
        //   title: 'Update Publishers',
        //   key: 'update publishers',
        //   icon: 'fe fe-bookmark',
        //   url: '/publisher/update',
        // },

        {
          title: "Manage Publishers",
          key: "manage publishers",
          icon: "fe fe-bookmark",
          url: "/publisher/list"
        }
      ]
    },
    {
      title: "Advertisers",
      key: "advertisers",
      icon: "fe fe-bookmark",
      url: "/advertisers",
      children: [
        {
          title: "Create Advertiser",
          key: "create advertiser",
          icon: "fe fe-bookmark",
          url: "/advertisers/create"
        },
        // {
        //   title: 'Update Advertiser',
        //   key: 'update advertiser',
        //   icon: 'fe fe-bookmark',
        //   url: '/advertisers/update',
        // },

        {
          title: "Manage Advertisers",
          key: "manage advertiser",
          icon: "fe fe-bookmark",
          url: "/advertisers/list"
        }
      ]
    },
    {
      title: "Offers",
      key: "offers",
      icon: "fe fe-bookmark",
      url: "/offers",
      children: [
        {
          title: "Manage Offers",
          key: "manage offers",
          icon: "fe fe-bookmark",
          url: "/offers_list"
        },
        {
          title: "Create Offer",
          key: "create offer",
          icon: "fe fe-bookmark",
          url: "/offers/add"
        },
        // {
        //   title: "Tiny Urls",
        //   key: "tiny urls",
        //   icon: "fe fe-bookmark",
        //   url: "/offers/tiny_url"
        // },
        {
          title: "Creative Files",
          key: "creative files",
          icon: "fe fe-bookmark",
          url: "/offer_files"
        },
        {
          title: "Offer Applications",
          key: "offer applications",
          icon: "fe fe-bookmark",
          url: "/offer_access/applications"
        },
        {
          title: "Offer Categories",
          key: "offer categories",
          icon: "fe fe-bookmark",
          url: "/offer_types"
        },
        {
          title: "Offer Groups",
          key: "offer groups",
          icon: "fe fe-bookmark",
          url: "/offer_groups"
        },
        {
          title: "Suppression Lists",
          key: "suppression lists",
          icon: "fe fe-bookmark",
          url: "/dne_lists"
        }
        // {
        //   title: 'Update Offer',
        //   key: 'update offer',
        //   icon: 'fe fe-bookmark',
        //   url: '/offer/update',
        // },
      ]
    },

    {
      title: "Reports",
      key: "reports",
      icon: "fe fe-bookmark",
      url: "/stats",
      children: [
        {
          title: "Offer Reports",
          key: "offer reports",
          icon: "fe fe-bookmark",
          url: "/stats/index/offers"
        }
      ]
    }
  ];
}
