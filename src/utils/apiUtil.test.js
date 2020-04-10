import mockData from "./mockAPIData"
import assert from "assert"
import { getShipmentReport } from "./apiUtil"

describe("getWeatherReport api test", () => {
  it("calls fetch with the correct url", () => {
    const fakeFetch = url => {
      assert(
        url.indexOf(
          "http://localhost:3000/shipments?page=2"
        ) > -1
      )
      return new Promise(function(resolve) {})
    }
    getShipmentReport(fakeFetch, 2, 20)
  })

  it("parses the response of fetch correctly", async done => {
    const fakeFetch = (url) => {
      assert(
        url.indexOf(
          "http://localhost:3000/shipments?page=3"
        ) > -1
      )
      return Promise.resolve({
        json: () => Promise.resolve(mockData)
      })
    }
    const shipmentList = await getShipmentReport(fakeFetch, 3, 20)
    assert(shipmentList.length === 20)
    assert(shipmentList[0].name === 'Vacuum Cleaners')
    assert(shipmentList[0].status === 'ACTIVE')
    assert(shipmentList[0].destination === 30)
    assert(shipmentList[0].total === 29)
    done()
  })
})
