import { ImageResponse } from 'next/og';

// Image metadata
export const alt = 'Oasis of Arabic - Master Arabic Online';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px',
          position: 'relative',
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            left: '-100px',
            width: '400px',
            height: '400px',
            background: '#ffffff',
            borderRadius: '50%',
            opacity: 0.1,
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-100px',
            right: '-100px',
            width: '400px',
            height: '400px',
            background: '#ffffff',
            borderRadius: '50%',
            opacity: 0.1,
            display: 'flex',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            zIndex: 1,
          }}
        >
          <h1
            style={{
              fontSize: '80px',
              fontWeight: 'bold',
              color: 'white',
              margin: '0 0 20px 0',
              letterSpacing: '-2px',
            }}
          >
            Oasis of Arabic
          </h1>
          <div
            style={{
              width: '200px',
              height: '6px',
              background: '#ffffff',
              borderRadius: '3px',
              margin: '0 0 40px 0',
              display: 'flex',
            }}
          />
          <p
            style={{
              fontSize: '40px',
              color: 'rgba(255, 255, 255, 0.9)',
              margin: '0 0 20px 0',
              fontWeight: '300',
            }}
          >
            Master Arabic Online
          </p>
          <p
            style={{
              fontSize: '28px',
              color: 'rgba(255, 255, 255, 0.8)',
              margin: 0,
            }}
          >
            Premium Courses • Live Zoom Classes • Arabic Grammar
          </p>
        </div>

        {/* Stats */}
        <div
          style={{
            display: 'flex',
            gap: '60px',
            marginTop: '60px',
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '30px 40px',
              borderRadius: '20px',
              border: '2px solid rgba(255, 255, 3, 0.3)',
            }}
          >
            <div
              style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: '#ffff03',
                margin: '0 0 10px 0',
              }}
            >
              7
            </div>
            <div
              style={{
                fontSize: '20px',
                color: 'rgba(255, 255, 255, 0.9)',
              }}
            >
              Premium Products
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '30px 40px',
              borderRadius: '20px',
              border: '2px solid rgba(255, 255, 3, 0.3)',
            }}
          >
            <div
              style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: '#ffff03',
                margin: '0 0 10px 0',
              }}
            >
              100%
            </div>
            <div
              style={{
                fontSize: '20px',
                color: 'rgba(255, 255, 255, 0.9)',
              }}
            >
              Quality Guaranteed
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '30px 40px',
              borderRadius: '20px',
              border: '2px solid rgba(255, 255, 3, 0.3)',
            }}
          >
            <div
              style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: '#ffff03',
                margin: '0 0 10px 0',
              }}
            >
              Free
            </div>
            <div
              style={{
                fontSize: '20px',
                color: 'rgba(255, 255, 255, 0.9)',
              }}
            >
              Delivery Service
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
