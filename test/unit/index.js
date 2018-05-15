const testsContext = require.context('./specs', true, /\.spec$/)
testsContext.keys().foreach(testsContext)
