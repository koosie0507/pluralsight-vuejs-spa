import Vue from 'vue'
import Post from '../../../src/app/theme/Post.vue'

function createComponent () {
  const PostConstructor = Vue.extend(Post)
  const comp = new PostConstructor({
    propsData: {
      link: 'http://www.netmatch.nl'
    }
  }).$mount()
  return comp
}

describe('Post.vue', () => {
  it('should render the link', () => {
    const comp = createComponent()
    expect(comp.$el.querySelector('.card-footer-item').getAttribute('href'))
      .to.equal('http://www.netmatch.nl')
  })

  it('should update element\'s href when property link changes', (done) => {
    const comp = createComponent()

    comp.link = 'http://stackoverflow.com'

    Vue.nextTick(() => {
      expect(comp.$el.querySelector('.card-footer-item').getAttribute('href'))
        .to.equal('http://stackoverflow.com')
      done()
    })
  })
})
