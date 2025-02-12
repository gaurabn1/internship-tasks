export default class GetAddresses {
  constructor(province, district, municipality, locations) {
    this.province = province;
    this.district = district;
    this.municipality = municipality;
    this.locations = locations;
  }

  getProvinces() {
    this.locations.provinceList.forEach((prov) => {
      const option = document.createElement('option');
      option.value = prov.name;
      option.textContent = prov.name;
      this.province.appendChild(option);
    })
  }

  getDistricts(selectedProvince) {
    let prov = this.locations.provinceList.find((p) => p.name === selectedProvince);
    prov.districtList.forEach((dist) => {
      const option = document.createElement('option');
      option.value = dist.name;
      option.textContent = dist.name;
      this.district.appendChild(option);
    })
  }

  getMunicipalities(selectedDistrict) {
    for(let i=0; i < this.locations.provinceList.length; i++){
      let dist = this.locations.provinceList[i].districtList.find((d) => d.name === selectedDistrict );
      if(dist){
        dist.municipalityList.forEach((mun) => {
          const option = document.createElement('option');
          option.value = mun.name;
          option.textContent = mun.name;
          this.municipality.appendChild(option);
          return
        })
      }
    }

  }
}
