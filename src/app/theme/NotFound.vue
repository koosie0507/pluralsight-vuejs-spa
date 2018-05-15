<template>
  <div>
    <h2 class="is-capitalized">Not found</h2>
    <p>You're trying to get a component that doesn't exist</p>
    <table class="is-bordered">
      <thead>
      <tr>
        <th>Property</th>
        <th>Value</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>Path</td>
        <td>{{this.$route.path}}</td>
      </tr>
      <tr>
        <td>Query</td>
        <td>{{this.$route.query}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
