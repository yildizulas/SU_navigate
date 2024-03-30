const buildingDescriptions = {
  FENS: "FENS\nFaculty of Engineering and Natural Sciences\nMühendislik ve Doğa Bilimleri Fakültesi",
  FMAN: "FMAN\nFaculty of Management\nYönetim Bilimleri Fakültesi",
  FASS: "aculty of Arts And Social Sciences\nSanat ve Sosyal Bilimler Fakültesi",
  // Diğer binalar için de benzer şekilde açıklamalar eklenebilir
};

const markers = {
  FENS: [
    {
      id: 'fens_floor1_1',
      name: 'fens11',
      coordinate: { latitude: 40.890817, longitude: 29.379623 },
      icon: 'home',
      color: '#0078D7',
      description: buildingDescriptions.FENS,
    },
    {
      id: 'fens_floor1_2',
      name: 'fens12',
      coordinate: { latitude: 40.89055, longitude: 29.37971 },
      icon: 'home',
      color: '#0078D7',
      description: buildingDescriptions.FENS,
    },
    {
      id: 'fens_floorG_1',
      name: 'fensG1',
      coordinate: { latitude: 40.890903148416605, longitude: 29.37922546549066 },
      icon: 'home',
      color: '#0078D7',
      description: buildingDescriptions.FENS,
    },
    {
      id: 'fens_floorG_2',
      name: 'fensG2',
      coordinate: { latitude: 40.89066964385056, longitude: 29.378779426896696 },
      icon: 'home',
      color: '#0078D7',
      description: buildingDescriptions.FENS,
    },
    {
      id: 'fens_floorG_3',
      name: 'fensG3',
      coordinate: { latitude: 40.890356462128004, longitude: 29.378919583202656 },
      icon: 'home',
      color: '#0078D7',
      description: buildingDescriptions.FENS,
    }
  ],

  FMAN: [
    {
      id: 'fman_floor1_1',
      name: 'fman11',
      coordinate: { latitude: 40.89217765986533, longitude: 29.379052741660065 },
      icon: 'home',
      color: '#0078D7',
      description: buildingDescriptions.FMAN
    },
    {
      id: 'fman_floorG_1',
      name: 'fmanG1',
      coordinate: { latitude: 40.89173818690588, longitude: 29.379060283281678 },
      icon: 'home',
      color: '#0078D7',
      description: buildingDescriptions.FMAN,
    },
    {
      id: 'fman_floorG_2',
      name: 'fmanG2',
      coordinate: { latitude: 40.89163477870607, longitude: 29.378594920039767 },
      icon: 'home',
      color: '#0078D7',
      description: buildingDescriptions.FMAN,
    },
    {
      id: 'fman_floorG_3',
      name: 'fmanG3',
      coordinate: { latitude: 40.89203754883784, longitude: 29.37828311869922 },
      icon: 'home',
      color: '#0078D7',
      description: buildingDescriptions.FMAN,
    }
  ],

  FASS: [
    {
      id: 'fass_floor1_1',
      name: 'fass11',
      coordinate: { latitude: 40.89062134296104, longitude: 29.378548581550373 },
      icon: 'home',
      color: '#0078D7',
      description: buildingDescriptions.FASS,
    },
    {
      id: 'fass_floor1_2',
      name: 'fass12',
      coordinate: { latitude: 40.89030816022006, longitude: 29.378680494354843 },
      icon: 'home',
      color: '#0078D7',
      description: buildingDescriptions.FASS,
    },
    {
      id: 'fass_floorG_1',
      name: 'fassG1',
      coordinate: { latitude: 40.89066185374734, longitude: 29.378119870407268 },
      icon: 'home',
      color: '#0078D7',
      description: buildingDescriptions.FASS,
    },
    {
      id: 'fass_floorG_2',
      name: 'fassG2',
      coordinate: { latitude: 40.89043124886767, longitude: 29.37767261035363 },
      icon: 'home',
      color: '#0078D7',
      description: buildingDescriptions.FASS,
    },
    {
      id: 'fass_floorG_3',
      name: 'fassG3',
      coordinate: { latitude: 40.89012274119029, longitude: 29.377804525150903 },
      icon: 'home',
      color: '#0078D7',
      description: buildingDescriptions.FASS,
    }
  ],

  BilgiMerkezi: [
    {
      id: 'bilgimerkezi_floor1_1',
      name: 'bilgimerkezi11',
      coordinate: { latitude: 40.89018818064822, longitude: 29.377577802588583 },
      icon: 'home',
      color: '#0078D7',
    }
  ],

  SL: [
    {
      id: 'sl_floor1_1',
      name: 'sl11',
      coordinate: { latitude: 40.89182887332948, longitude: 29.378058039035185 },
      icon: 'home',
      color: '#0078D7',
    },
    {
      id: 'sl_floorG_1',
      name: 'slG1',
      coordinate: { latitude: 40.8915982753406, longitude: 29.377672612731015 },
      icon: 'home',
      color: '#0078D7',
    },
    {
      id: 'sl_floorG_2',
      name: 'slG2',
      coordinate: { latitude: 40.89156399484765, longitude: 29.377225353317144 },
      icon: 'home',
      color: '#0078D7',
    },
    {
      id: 'sl_floorG_3',
      name: 'slG3',
      coordinate: { latitude: 40.891755639400465, longitude: 29.377144967597527 },
      icon: 'home',
      color: '#0078D7',
    },
    {
      id: 'sl_floorG_4',
      name: 'slG4',
      coordinate: { latitude: 40.891786804412135, longitude: 29.37772826159551 },
      icon: 'home',
      color: '#0078D7',
    },
    {
      id: 'sl_floorG_5',
      name: 'slG5',
      coordinate: { latitude: 40.89171668940297, longitude: 29.37748917344429 },
      icon: 'home',
      color: '#0078D7',
    }
  ],

  SUNUM: [
    {
      id: 'sunum_floorG_1',
      name: 'sunumG1',
      coordinate: { latitude: 40.889394664111876, longitude: 29.379168986919577 },
      icon: 'home',
      color: '#0078D7',
    }
  ],

  SUSAM: [
    {
      id: 'susam_floorG_1',
      name: 'susamG1',
      coordinate: { latitude: 40.889746563579216, longitude: 29.377933083613343 },
      icon: 'home',
      color: '#0078D7',
    },
    {
      id: 'susam_floorG_2',
      name: 'susamG2',
      coordinate: { latitude: 40.889884868088366, longitude: 29.37853883730362 },
      icon: 'home',
      color: '#0078D7',
    }
  ],

  EspressoLab: [
    {
      id: 'espressolab_1',
      name: 'espressolab1',
      coordinate: { latitude: 40.891576600732265, longitude: 29.381341447669154 },
      icon: 'home',
      color: '#0078D7',
    },
    {
      id: 'espressolab_2',
      name: 'espressolab2',
      coordinate: { latitude: 40.89160233748084, longitude: 29.38150389126867 },
      icon: 'home',
      color: '#0078D7',
    }
  ],

  KopukluKafe: [
    {
      id: 'kopuklukafe_1',
      name: 'kopuklukafe1',
      coordinate: { latitude: 40.89163528621141, longitude: 29.381540101080997 },
      icon: 'home',
      color: '#0078D7',
    },
    {
      id: 'kopuklukafe_2',
      name: 'kopuklukafe2',
      coordinate: { latitude: 40.89172450121925, longitude: 29.381573628746764 },
      icon: 'home',
      color: '#0078D7',
    }
  ],

  PiazzaKafe: [
    {
      id: 'piazzakafe_1',
      name: 'piazzakafe1',
      coordinate: { latitude: 40.891811688343566, longitude: 29.381528031127548 },
      icon: 'home',
      color: '#0078D7',
    },
    {
      id: 'piazzakafe_2',
      name: 'piazzakafe2',
      coordinate: { latitude: 40.89187657161685, longitude: 29.38131680678343 },
      icon: 'home',
      color: '#0078D7',
    }
  ],

  Starbucks: [
    {
      id: 'starbucks_1',
      name: 'starbucks1',
      coordinate: { latitude: 40.89128373840081, longitude: 29.380331241019274 },
      icon: 'home',
      color: '#0078D7',
    }
  ],

  KucukEv: [
    {
      id: 'kucukev_1',
      name: 'kucukev1',
      coordinate: { latitude: 40.89128779366467, longitude: 29.380333252777444 },
      icon: 'home',
      color: '#0078D7',
    }
  ],

  OgrenciMerkezi: [
    {
      id: 'ogrencimerkezi_floor1_1',
      name: 'ogrencimerkezi11',
      coordinate: { latitude: 40.891539956951725, longitude: 29.38018908515629 },
      icon: 'home',
      color: '#0078D7',
    },
    {
      id: 'ogrencimerkezi_floor1_2',
      name: 'ogrencimerkezi12',
      coordinate: { latitude: 40.89159641901652, longitude: 29.379908994369686 },
      icon: 'home',
      color: '#0078D7',
    },
    {
      id: 'ogrencimerkezi_floorG_1',
      name: 'ogrencimerkeziG1',
      coordinate: { latitude: 40.89107157416748, longitude: 29.37991918167079 },
      icon: 'home',
      color: '#0078D7',
    }
  ],

  Coffy: [
    {
      id: 'coffy_1',
      name: 'coffy1',
      coordinate: { latitude: 40.89023636197615, longitude: 29.377547899704826 },
      icon: 'home',
      color: '#0078D7',
    },
    {
      id: 'coffy_2',
      name: 'coffy2',
      coordinate: { latitude: 40.89032940396747, longitude: 29.37747674512563 },
      icon: 'home',
      color: '#0078D7',
    }
  ],

  PizzaBulls: [
    {
      id: 'pizzabulls_1',
      name: 'pizzabulls1',
      coordinate: { latitude: 40.888741243981364, longitude: 29.3786528209367 },
      icon: 'home',
      color: '#0078D7',
    }
  ],

  Subway: [
    {
      id: 'subway_1',
      name: 'subway1',
      coordinate: { latitude: 40.888760262038964, longitude: 29.378650781183467 },
      icon: 'home',
      color: '#0078D7',
    }
  ],

  Shuttle: [
    {
      id: 'shuttle_1',
      name: 'shuttle1',
      coordinate: { latitude: 40.88857470714809, longitude: 29.37860386717155 },
      icon: 'home',
      color: '#0078D7',
    }
  ],

  KM18: [
    {
      id: 'km18_1',
      name: 'km181',
      coordinate: { latitude: 40.888618536523104, longitude: 29.37759307661397 },
      icon: 'home',
      color: '#0078D7',
    }
  ],

  Medline: [
    {
      id: 'medline_floorL_1',
      name: 'medlineL1',
      coordinate: { latitude: 40.891644896186286, longitude: 29.38270851366485 },
      icon: 'home',
      color: '#0078D7',
    },
    {
      id: 'medline_floorG_1',
      name: 'medlineG1',
      coordinate: { latitude: 40.89186235723646, longitude: 29.382817813628453 },
      icon: 'home',
      color: '#0078D7',
    }
  ],

  KargoMerkezi: [
    {
      id: 'kargomerkezi_1',
      name: 'kargomerkezi1',
      coordinate: { latitude: 40.891852219147836, longitude: 29.38253953452882 },
      icon: 'home',
      color: '#0078D7',
    }
  ],

  Kuafor: [
    {
      id: 'kuafor_1',
      name: 'kuafor1',
      coordinate: { latitude: 40.89186134344371, longitude: 29.38287816342535 },
      icon: 'home',
      color: '#0078D7',
    }
  ],

  GosteriMerkezi: [
    {
      id: 'gosterimerkezi_1',
      name: 'gosterimerkezi1',
      coordinate: { latitude: 40.8929353395598, longitude: 29.375027480471076 },
      icon: 'home',
      color: '#0078D7',
    },
    {
      id: 'gosterimerkezi_2',
      name: 'gosterimerkezi2',
      coordinate: { latitude: 40.89291184956836, longitude: 29.37488113376449 },
      icon: 'home',
      color: '#0078D7',
    }
  ],

  SporMerkezi: [
    {
      id: 'spormerkezi_1',
      name: 'spormerkezi1',
      coordinate: { latitude: 40.89337962732766, longitude: 29.374974713951076 },
      icon: 'home',
      color: '#0078D7',
    },
    {
      id: 'spormerkezi_2',
      name: 'spormerkezi2',
      coordinate: { latitude: 40.89327419418885, longitude: 29.374508010527446 },
      icon: 'home',
      color: '#0078D7',
    },
    {
      id: 'spormerkezi_3',
      name: 'spormerkezi3',
      coordinate: { latitude: 40.893769930929935, longitude: 29.374092267004794 },
      icon: 'home',
      color: '#0078D7',
    },
    {
      id: 'spormerkezi_4',
      name: 'spormerkezi4',
      coordinate: { latitude: 40.89394734103792, longitude: 29.375036407182424 },
      icon: 'home',
      color: '#0078D7',
    }
  ],

  HaliSaha: [
    {
      id: 'halisaha_1',
      name: 'halisaha1',
      coordinate: { latitude: 40.8949599362751, longitude: 29.374675858914934 },
      icon: 'home',
      color: '#0078D7',
    }
  ],

  KapaliTenisKortu: [
    {
      id: 'kapaliteniskortu_1',
      name: 'kapaliteniskortu1',
      coordinate: { latitude: 40.89508969593133, longitude: 29.374241341619847 },
      icon: 'home',
      color: '#0078D7',
    }
  ],

  SUCool: [
    {
      id: 'sucool_1',
      name: 'sucool1',
      coordinate: { latitude: 40.89465979831959, longitude: 29.37507841204523 },
      icon: 'home',
      color: '#0078D7',
    }
  ],

  FutbolStadyumu: [
    {
      id: 'futbolstadyumu_1',
      name: 'futbolstadyumu1',
      coordinate: { latitude: 40.894941168511544, longitude: 29.37818145482878 },
      icon: 'home',
      color: '#0078D7',
    }
  ],

  AmfiTiyatro: [
    {
      id: 'amfitiyatro_floor1_1',
      name: 'amfitiyatro11',
      coordinate: { latitude: 40.892919543578586, longitude: 29.379604608642993 },
      icon: 'home',
      color: '#0078D7',
    },
    {
      id: 'amfitiyatro_floorG_1',
      name: 'amfitiyatroG1',
      coordinate: { latitude: 40.89335146931966, longitude: 29.378959163807167 },
      icon: 'home',
      color: '#0078D7',
    }
  ],

  A1: [
    {
      id: 'a1_1',
      name: 'a11',
      coordinate: { latitude: 40.89188696622543, longitude: 29.381913722117837 },
      icon: 'home',
      color: '#0078D7',
    },
    {
      id: 'a1_2',
      name: 'a12',
      coordinate: { latitude: 40.892282418057015, longitude: 29.381715178123383 },
      icon: 'home',
      color: '#0078D7',
    },
    {
      id: 'a1_3',
      name: 'a13',
      coordinate: { latitude: 40.89203746973919, longitude: 29.382176581583813 },
      icon: 'home',
      color: '#0078D7',
    }
  ],

  A2: [
    {
      id: 'a2_1',
      name: 'a21',
      coordinate: { latitude: 40.892053272476474, longitude: 29.382237803644884 },
      icon: 'home',
      color: '#0078D7',
    },
    {
      id: 'a2_2',
      name: 'a22',
      coordinate: { latitude: 40.89203408359234, longitude: 29.38257974851145 },
      icon: 'home',
      color: '#0078D7',
    },
    {
      id: 'a2_3',
      name: 'a23',
      coordinate: { latitude: 40.89244834870295, longitude: 29.382440882001063 },
      icon: 'home',
      color: '#0078D7',
    }
  ],

  A3: [
    {
      id: 'a3_1',
      name: 'a31',
      coordinate: { latitude: 40.892169537225904, longitude: 29.382726084859865 },
      icon: 'home',
      color: '#0078D7',
    },
    {
      id: 'a3_2',
      name: 'a32',
      coordinate: { latitude: 40.892153389081905, longitude: 29.383060256676046 },
      icon: 'home',
      color: '#0078D7',
    },
    {
      id: 'a3_3',
      name: 'a33',
      coordinate: { latitude: 40.89255446014668, longitude: 29.38292761962279 },
      icon: 'home',
      color: '#0078D7',
    }
  ],

  A4: [
    {
      id: 'a4_1',
      name: 'a41',
      coordinate: { latitude: 40.8926109319412, longitude: 29.38290627383993 },
      icon: 'home',
      color: '#0078D7',
    },
    {
      id: 'a4_2',
      name: 'a42',
      coordinate: { latitude: 40.89284834628948, longitude: 29.38244279772838 },
      icon: 'home',
      color: '#0078D7',
    },
    {
      id: 'a4_3',
      name: 'a43',
      coordinate: { latitude: 40.89296935850826, longitude: 29.382604404872968 },
      icon: 'home',
      color: '#0078D7',
    }
  ],

  A5: [
    {
      id: 'a5_1',
      name: 'a51',
      coordinate: { latitude: 40.89250375004112, longitude: 29.382419929828572 },
      icon: 'home',
      color: '#0078D7',
    },
    {
      id: 'a5_2',
      name: 'a52',
      coordinate: { latitude: 40.892721570144246, longitude: 29.381973223187646 },
      icon: 'home',
      color: '#0078D7',
    },
    {
      id: 'a5_3',
      name: 'a53',
      coordinate: { latitude: 40.89286217612103, longitude: 29.382371141656645 },
      icon: 'home',
      color: '#0078D7',
    }
  ],

  A6: [
    {
      id: 'a6_1',
      name: 'a61',
      coordinate: { latitude: 40.892708709489995, longitude: 29.381907284738375 },
      icon: 'home',
      color: '#0078D7',
    },
    {
      id: 'a6_2',
      name: 'a62',
      coordinate: { latitude: 40.89273316336795, longitude: 29.38155450334314 },
      icon: 'home',
      color: '#0078D7',
    },
    {
      id: 'a6_3',
      name: 'a63',
      coordinate: { latitude: 40.89232324536293, longitude: 29.38169931649885 },
      icon: 'home',
      color: '#0078D7',
    }
  ],

  B1: [
    {
      id: 'b1_1',
      name: 'b11',
      coordinate: { latitude: 40.89260623014287, longitude: 29.381346534431415 },
      icon: 'home',
      color: '#0078D7',
    },
    {
      id: 'b1_2',
      name: 'b12',
      coordinate: { latitude: 40.892529368626406, longitude: 29.380882836731764 },
      icon: 'home',
      color: '#0078D7',
    },
    {
      id: 'b1_3',
      name: 'b13',
      coordinate: { latitude: 40.89286708569678, longitude: 29.380841238775364 },
      icon: 'home',
      color: '#0078D7',
    }
  ],

  B2: [
    {
      id: 'b2_1',
      name: 'b21',
      coordinate: { latitude: 40.89224405644848, longitude: 29.38067486662594 },
      icon: 'home',
      color: '#0078D7',
    },
    {
      id: 'b2_2',
      name: 'b22',
      coordinate: { latitude: 40.89255964696292, longitude: 29.380115653221917 },
      icon: 'home',
      color: '#0078D7',
    }
  ],

  B3: [
    {
      id: 'b3_1',
      name: 'b31',
      coordinate: { latitude: 40.89138550940065, longitude: 29.381468921692935 },
      icon: 'home',
      color: '#0078D7',
    },
    {
      id: 'b3_2',
      name: 'b32',
      coordinate: { latitude: 40.89101634309765, longitude: 29.381552111176497 },
      icon: 'home',
      color: '#0078D7',
    },
    {
      id: 'b3_3',
      name: 'b33',
      coordinate: { latitude: 40.89125391382938, longitude: 29.382041996454838 },
      icon: 'home',
      color: '#0078D7',
    }
  ],

  B4: [
    {
      id: 'b4_1',
      name: 'b41',
      coordinate: { latitude: 40.8912667239691, longitude: 29.382062023302026 },
      icon: 'home',
      color: '#0078D7',
    },
    {
      id: 'b4_2',
      name: 'b42',
      coordinate: { latitude: 40.891570674023455, longitude: 29.38231159061155 },
      icon: 'home',
      color: '#0078D7',
    },
    {
      id: 'b4_3',
      name: 'b43',
      coordinate: { latitude: 40.89178029534348, longitude: 29.382177564796002 },
      icon: 'home',
      color: '#0078D7',
    },
    {
      id: 'b4_4',
      name: 'b44',
      coordinate: { latitude: 40.891712751366015, longitude: 29.381829404613974 },
      icon: 'home',
      color: '#0078D7',
    }
  ],

  B5: [
    {
      id: 'b5_1',
      name: 'b51',
      coordinate: { latitude: 40.891978268903976, longitude: 29.381105356239413 },
      icon: 'home',
      color: '#0078D7',
    }
  ],

  B6: [
    {
      id: 'b6_1',
      name: 'b61',
      coordinate: { latitude: 40.89280028579637, longitude: 29.381474550184272 },
      icon: 'home',
      color: '#0078D7',
    },
    {
      id: 'b6_2',
      name: 'b62',
      coordinate: { latitude: 40.892943522950645, longitude: 29.3809322861066 },
      icon: 'home',
      color: '#0078D7',
    }
  ],

  B7: [
    {
      id: 'b7_1',
      name: 'b71',
      coordinate: { latitude: 40.892950774116606, longitude: 29.382164907623157 },
      icon: 'home',
      color: '#0078D7',
    },
    {
      id: 'b7_2',
      name: 'b72',
      coordinate: { latitude: 40.89311816967156, longitude: 29.381577695856002 },
      icon: 'home',
      color: '#0078D7',
    }
  ],

  B8: [
    {
      id: 'b8_1',
      name: 'b81',
      coordinate: { latitude: 40.8935089847807, longitude: 29.380588036871785 },
      icon: 'home',
      color: '#0078D7',
    },
    {
      id: 'b8_2',
      name: 'b82',
      coordinate: { latitude: 40.893956610658925, longitude: 29.380806511614573 },
      icon: 'home',
      color: '#0078D7',
    }
  ],

  B9: [
    {
      id: 'b9_1',
      name: 'b91',
      coordinate: { latitude: 40.89401340444779, longitude: 29.380782785776905 },
      icon: 'home',
      color: '#0078D7',
    },
    {
      id: 'b9_2',
      name: 'b92',
      coordinate: { latitude: 40.89429288779566, longitude: 29.380271692441706 },
      icon: 'home',
      color: '#0078D7',
    }
  ],

  B10: [
    {
      id: 'b10_1',
      name: 'b101',
      coordinate: { latitude: 40.89092606119986, longitude: 29.382772199750114 },
      icon: 'home',
      color: '#0078D7',
    },
    {
      id: 'b10_2',
      name: 'b102',
      coordinate: { latitude: 40.890901991538776, longitude: 29.38336712605431 },
      icon: 'home',
      color: '#0078D7',
    }
  ],

  B11: [
    {
      id: 'b11_1',
      name: 'b111',
      coordinate: { latitude: 40.89079746552087, longitude: 29.382593903576144 },
      icon: 'home',
      color: '#0078D7',
    },
    {
      id: 'b11_2',
      name: 'b112',
      coordinate: { latitude: 40.8907940270067, longitude: 29.383225217617813 },
      icon: 'home',
      color: '#0078D7',
    }
  ],

  AnaGiris: [
    {
      id: 'anagiris_1',
      name: 'anagiris1',
      coordinate: { latitude: 40.88958303361118, longitude: 29.374157102465535 },
      icon: 'home',
      color: '#0078D7',
    }
  ], 



};

export default markers;
