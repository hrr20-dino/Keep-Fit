export default class HeatMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "1452843457" : 29
    };
  }

  getTimeStamps(){
    $.get(`/api/users/$userId`, (err, resp) => {
      if (err) {
        console.log('Error grabbing timestamps: ', err);
      } else {
        var obj = {};
        var timestamps = resp.data;
        for (var i = 0; i < timestamps.length; i++) {
          var curr = timestamps[i];
          obj[curr.timestamp] = 30;
        }
        this.setState(obj);
      }
    });
  }

  render() {

    return (
      <div>
      {
        new CalHeatMap().init({
          itemSelector: '.heatmap',
          start: new Date( 2016, 0, 1 ),
          end: new Date( 2016, 12, 31 ),
          data: this.state,
          domain: 'month',
          legendColors: {
            min: "#efefef",
            max: "#8F7FFF",
            empty: "white"
        }
        })
      }
      </div>
    );
  }

}
