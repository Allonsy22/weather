<template>
  <v-app id="app">
    <v-container>
      <!--input-->
      <v-alert :value="error"
                type="error">
      {{errorMessage}}
      </v-alert>
      <v-text-field placeholder="City"
                    hint="Paris,FR"
                    box
                    v-model="city"
                    class="title"
                    append-icon="search"
                    @click:append="search"
                    @keyup.enter="search"></v-text-field>
      <!--main section-->
      <v-layout :class="{'column': $vuetify.breakpoint.smAndDown}"
                style="height: 400px;"
                v-if="weatherData">
        <v-flex :class="{head_desktop: $vuetify.breakpoint.mdAndUp,
                        head_mobile: $vuetify.breakpoint.smAndDown}">
          <v-layout align-center
                    fill-height
                    row>
            <v-layout column>
              <div :class="{city_name_desktop: $vuetify.breakpoint.mdAndUp,
                            city_name_mobile: $vuetify.breakpoint.smAndDown}">{{name}}, {{country}}</div>
              <div :class="{temperature_desktop: $vuetify.breakpoint.mdAndUp,
                            temperature_mobile: $vuetify.breakpoint.smAndDown}">{{tempCelsius}} C</div>
            </v-layout>
            <v-img :src="weatherIcons[weather]"
                    max-width="200"></v-img>
          </v-layout>
        </v-flex>
        <!--additional section-->
        <v-layout :class="{'column': $vuetify.breakpoint.mdAndUp}">
          <!--wind section-->
          <v-layout :class="{additional_info_desktop: $vuetify.breakpoint.mdAndUp,
                          additional_info_mobile: $vuetify.breakpoint.smAndDown}"
                    style="background-color: #2ecc71"
                    column
                    align-center
                    justify-center>
            <!--speed-->
            <div class="wind">Wind</div>
            <v-layout row
                      align-center
                      class="title white--text">
              <v-img :src="additionalIcon.speed" 
                      width="50"
                      contain></v-img>
              <div>{{windSpeed}} m/s</div>
            </v-layout>
            <!--speed deg-->
            <v-layout row
                      align-center
                      class="title white--text"
                      v-if="windDeg">
              <v-img :src="additionalIcon.deg" 
                      width="50"
                      contain></v-img>
              <div>{{windDeg}}</div>
            </v-layout>
          </v-layout>
          <!--pressure, humidity-->
          <v-layout :class="{additional_info_desktop: $vuetify.breakpoint.mdAndUp,
                          additional_info_mobile: $vuetify.breakpoint.smAndDown}"
                    style="background-color: #f39c12"
                    column
                    align-center
                    justify-center>
            <!--pressure-->
            <v-layout row
                      align-center
                      class="title white--text">
              <v-img :src="additionalIcon.pressure" 
                      width="50"
                      contain></v-img>
              <div>{{pressure}}</div>
            </v-layout>
            <!--humidity-->
            <v-layout row
                      align-center
                      class="title white--text">
              <v-img :src="additionalIcon.humidity" 
                      width="50"
                      contain></v-img>
              <div>{{humidity}}</div>
            </v-layout>
          </v-layout>
        </v-layout>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'app',
  data() {
    return {
      city: "",
      error: false,
      errorMessage: "Invalid city",
      weatherIcons: {
        Clear: require('@/assets/icon/Clear.svg'),
        Clouds: require('@/assets/icon/Clouds.svg'),
        Rain: require('@/assets/icon/Rain.svg'),
        Snow: require('@/assets/icon/Snow.svg'),
        Thunderstorm: require('@/assets/icon/Thunderstorm.svg'),
        Mist: require('@/assets/icon/Mist.svg'),
        Tornado: require('@/assets/icon/Tornado.svg'),
        Drizzle: require('@/assets/icon/Drizzle.svg'),
      },
      additionalIcon: {
        wind: require('@/assets/icon/Wind.svg'),
        humidity: require('@/assets/icon/humidity.svg'),
        speed: require('@/assets/icon/speed.svg'),
        deg: require('@/assets/icon/deg.svg'),
        pressure: require('@/assets/icon/pressure.svg'),
      }
    }
  },
  computed: {
    ...mapGetters([
      'weatherData',
      'tempCelsius',
      'tempKelvin',
      'name',
      'country',
      'weather',
      'description',
      'windSpeed',
      'windDeg',
      'humidity',
      'pressure'
    ])
  },
  methods: {
    search() {
      this.$store.dispatch('getWeatherData', this.city).then(() => {
        this.error = false;
      }).catch( e => {
        this.error = true;
        console.log(e);
      });
    }
  },
};
</script>

<style scoped>
.head_desktop {
  width: 400px;
  height: 100%;
  border-radius: 30px;
  background-color: #3498db;
  text-align: center;
}

.head_mobile {
  width: 100%;
  height: 200px;
  border-radius: 30px;
  background-color: #3498db;
  text-align: center;
}

.additional_info_mobile {
  width: 100%;
  height: 100%;
  border-radius: 30px;
  text-align: center;
}

.additional_info_desktop {
  width: 100%;
  height: 100%;
  border-radius: 30px;
  text-align: center;
}

.city_name_desktop {
  font-size: 3em;
  color: #ffffff;
}

.city_name_mobile {
  font-size: 1.8em;
  color: #ffffff;
}

.temperature_desktop {
  font-size: 3em;
  color: #f1c40f;
}

.temperature_mobile {
  font-size: 1.8em;
  color: #f1c40f;
}
.wind {
  font-size: 18px;
}
</style>
