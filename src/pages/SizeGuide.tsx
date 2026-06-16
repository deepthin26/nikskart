import { useSeoMeta } from '../hooks/useSeoMeta';

export default function SizeGuide() {
  useSeoMeta(
    'Size Guide – Nikskart | Saree, Kurti & Jewellery Sizing',
    'Find your perfect fit with the Nikskart size guide — measurements for sarees, kurtis, blouses and jewellery.'
  );

  return (
    <main className="page-content static-page">
      <div className="static-hero">
        <span className="static-hero-label">Find Your Fit</span>
        <h1>Size Guide</h1>
        <p>Use our size charts to find the perfect fit for sarees, kurtis and blouses.</p>
      </div>

      <div className="static-body">
        <section className="static-section">
          <h2>How to Measure</h2>
          <p>Use a soft measuring tape and measure over your undergarments. Keep the tape snug but not tight. All measurements are in inches unless noted.</p>
        </section>

        <section className="static-section">
          <h2>Kurti Size Chart</h2>
          <div className="size-table-wrap">
            <table className="size-table">
              <thead>
                <tr>
                  <th>Size</th>
                  <th>Chest (in)</th>
                  <th>Waist (in)</th>
                  <th>Hip (in)</th>
                  <th>Length (in)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>XS</td><td>32</td><td>26</td><td>34</td><td>42</td></tr>
                <tr><td>S</td><td>34</td><td>28</td><td>36</td><td>43</td></tr>
                <tr><td>M</td><td>36</td><td>30</td><td>38</td><td>44</td></tr>
                <tr><td>L</td><td>38</td><td>32</td><td>40</td><td>45</td></tr>
                <tr><td>XL</td><td>40</td><td>34</td><td>42</td><td>46</td></tr>
                <tr><td>XXL</td><td>42</td><td>36</td><td>44</td><td>47</td></tr>
                <tr><td>3XL</td><td>44</td><td>38</td><td>46</td><td>48</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="static-section">
          <h2>Blouse Size Chart</h2>
          <div className="size-table-wrap">
            <table className="size-table">
              <thead>
                <tr>
                  <th>Size</th>
                  <th>Bust (in)</th>
                  <th>Waist (in)</th>
                  <th>Sleeve Length (in)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>32</td><td>32–33</td><td>26–27</td><td>8</td></tr>
                <tr><td>34</td><td>34–35</td><td>28–29</td><td>8.5</td></tr>
                <tr><td>36</td><td>36–37</td><td>30–31</td><td>9</td></tr>
                <tr><td>38</td><td>38–39</td><td>32–33</td><td>9.5</td></tr>
                <tr><td>40</td><td>40–41</td><td>34–35</td><td>10</td></tr>
                <tr><td>42</td><td>42–43</td><td>36–37</td><td>10</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="static-section">
          <h2>Saree</h2>
          <p>All our sarees are <strong>5.5 metres</strong> long (including a 0.8 m blouse piece), which is standard for all Indian sarees. The length fits all heights and draping styles.</p>
        </section>

        <section className="static-section">
          <h2>Bangle Size</h2>
          <div className="size-table-wrap">
            <table className="size-table">
              <thead>
                <tr>
                  <th>Indian Size</th>
                  <th>Diameter (mm)</th>
                  <th>Fits Wrist (in)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>2/2</td><td>52</td><td>5.5–6.0</td></tr>
                <tr><td>2/4</td><td>56</td><td>6.0–6.5</td></tr>
                <tr><td>2/6</td><td>60</td><td>6.5–7.0</td></tr>
                <tr><td>2/8</td><td>64</td><td>7.0–7.5</td></tr>
                <tr><td>2/10</td><td>68</td><td>7.5–8.0</td></tr>
              </tbody>
            </table>
          </div>
          <p className="policy-note">To find your bangle size: make a fist with your hand and measure the widest part of your knuckles with a measuring tape.</p>
        </section>

        <section className="static-section">
          <h2>Need Help?</h2>
          <p>Not sure about your size? WhatsApp us at <a href="https://wa.me/918885700227" className="inline-link">+91 88857 00227</a> and we'll guide you to the right fit.</p>
        </section>
      </div>
    </main>
  );
}
